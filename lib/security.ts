import { timingSafeEqual } from "crypto";

/** Constant-time string compare — avoids leaking length/content via timing. */
export function safeEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // Still do a compare to keep timing constant, then fail.
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

/** Trim + hard-cap a string so oversized payloads can't bloat the DB/emails. */
export function capped(v: unknown, max: number): string {
  return String(v ?? "").trim().slice(0, max);
}

// Field length limits for the public contact/brief form.
export const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  company: 200,
  budget: 60,
  timeline: 60,
  message: 4000,
  source: 40,
  interest: 60,
  maxInterests: 20,
};

/**
 * Minimal in-memory rate limiter (per server instance).
 * Not bulletproof on serverless (per-instance), but stops trivial floods.
 * key = IP or similar. Returns true if the request is allowed.
 */
const hits = new Map<string, number[]>();
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    hits.set(key, arr);
    return false;
  }
  arr.push(now);
  hits.set(key, arr);
  // occasional cleanup
  if (hits.size > 5000) {
    Array.from(hits.entries()).forEach(([k, v]) => {
      if (v.every((t) => now - t > windowMs)) hits.delete(k);
    });
  }
  return true;
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
