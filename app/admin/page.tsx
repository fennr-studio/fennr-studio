"use client";

import { useEffect, useMemo, useState } from "react";

type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  interests: string[] | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  notes: string | null;
  source: string | null;
  status: string;
};

const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;
const STATUS_COLOR: Record<string, string> = {
  new: "#5C84B0",
  contacted: "#DFAF00",
  quoted: "#C77D2E",
  won: "#2E9E5B",
  lost: "#9AA0A6",
};

const DAY = 86400000;
// A lead is "stale" if it's been sitting in an active stage with no update.
function isStale(l: Lead): boolean {
  if (l.status !== "contacted" && l.status !== "quoted") return false;
  return Date.now() - new Date(l.updated_at).getTime() > 3 * DAY;
}
function daysAgo(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / DAY);
}

export default function AdminPage() {
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const authFetch = (url: string, init: RequestInit = {}) =>
    fetch(url, {
      ...init,
      headers: { ...(init.headers || {}), "x-admin-password": pass },
    });

  const load = async (password: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", {
        headers: { "x-admin-password": password },
      });
      if (res.status === 401) throw new Error("Wrong password.");
      if (!res.ok) throw new Error((await res.json()).error || "Failed to load.");
      const data = await res.json();
      setLeads(data.leads || []);
      setAuthed(true);
      localStorage.setItem("fennr_admin", password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed.");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("fennr_admin");
    if (saved) {
      setPass(saved);
      load(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem("fennr_admin");
    setPass("");
    setAuthed(false);
  };

  const patch = async (id: string, body: Record<string, unknown>) => {
    await authFetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...body }),
    });
  };

  const setStatus = (id: string, status: string) => {
    setLeads((ls) =>
      ls.map((l) =>
        l.id === id ? { ...l, status, updated_at: new Date().toISOString() } : l,
      ),
    );
    patch(id, { status });
  };

  const saveNote = (id: string, notes: string) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, notes } : l)));
    patch(id, { notes });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    setLeads((ls) => ls.filter((l) => l.id !== id));
    await authFetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
  };

  const counts = useMemo(
    () =>
      STATUSES.reduce(
        (a, s) => ({ ...a, [s]: leads.filter((l) => l.status === s).length }),
        {} as Record<string, number>,
      ),
    [leads],
  );
  const staleCount = useMemo(() => leads.filter(isStale).length, [leads]);

  const shown = useMemo(() => {
    let list = leads;
    if (filter === "stale") list = list.filter(isStale);
    else if (filter !== "all") list = list.filter((l) => l.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((l) =>
        [l.name, l.email, l.phone, l.company, l.message, l.notes, l.source]
          .filter(Boolean)
          .some((v) => (v as string).toLowerCase().includes(q)),
      );
    }
    return list;
  }, [leads, filter, query]);

  const exportCsv = () => {
    const cols = [
      "name", "email", "phone", "company", "interests", "budget",
      "timeline", "status", "source", "notes", "created_at",
    ];
    const esc = (v: unknown) =>
      `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = [
      cols.join(","),
      ...leads.map((l) =>
        cols
          .map((c) =>
            esc(
              c === "interests"
                ? (l.interests || []).join("; ")
                : (l as Record<string, unknown>)[c],
            ),
          )
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([rows], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `fennr-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- login gate ----------
  if (!authed) {
    return (
      <main className="min-h-screen bg-mist grid place-items-center container-px">
        <div className="w-full max-w-sm">
          <p className="eyebrow text-accent mb-3">Fennr admin</p>
          <h1 className="display text-3xl text-ink mb-6">Leads dashboard</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              load(pass);
            }}
            className="flex flex-col gap-3"
          >
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Admin password"
              className="input-flat"
              autoFocus
            />
            <button className="btn-accent h-[52px]" disabled={loading}>
              <span className="font-semibold not-italic">
                {loading ? "Checking…" : "Enter"}
              </span>
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </div>
      </main>
    );
  }

  const won = counts.won || 0;
  const active = leads.length - won - (counts.lost || 0);

  // ---------- dashboard ----------
  return (
    <main className="min-h-screen bg-mist container-px py-10 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
        <div>
          <p className="eyebrow text-accent">Fennr admin</p>
          <h1 className="display text-4xl text-ink mt-2">Leads</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowAdd(true)} className="btn-accent h-[44px] text-sm">
            <span className="font-semibold not-italic">+ Add lead</span>
          </button>
          <button onClick={exportCsv} className="btn-ink h-[44px] text-sm">
            Export CSV
          </button>
          <button onClick={() => load(pass)} className="h-[44px] px-4 rounded-md ring-1 ring-hairline bg-paper text-ink text-sm hover:ring-ink transition-smooth" disabled={loading}>
            {loading ? "…" : "↻"}
          </button>
          <button onClick={logout} className="h-[44px] px-4 rounded-md ring-1 ring-hairline bg-paper text-ink/60 text-sm hover:ring-ink transition-smooth">
            Log out
          </button>
        </div>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <Stat label="Total" value={leads.length} />
        <Stat label="Active" value={active} />
        <Stat label="Won" value={won} color="#2E9E5B" />
        <Stat
          label="Need follow-up"
          value={staleCount}
          color={staleCount ? "#C77D2E" : undefined}
          onClick={() => setFilter("stale")}
        />
        <Stat label="New" value={counts.new || 0} color="#5C84B0" onClick={() => setFilter("new")} />
      </div>

      {/* search + filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, notes…"
          className="input-flat h-[40px] w-full sm:w-64 text-sm"
        />
        <Chip label={`All ${leads.length}`} on={filter === "all"} onClick={() => setFilter("all")} />
        {staleCount > 0 && (
          <Chip
            label={`⚠ Follow-up ${staleCount}`}
            on={filter === "stale"}
            onClick={() => setFilter("stale")}
          />
        )}
        {STATUSES.map((s) => (
          <Chip key={s} label={`${s} ${counts[s] || 0}`} on={filter === s} onClick={() => setFilter(s)} />
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-ink/60">No leads here.</p>
      ) : (
        <div className="grid gap-4">
          {shown.map((l) => (
            <LeadCard
              key={l.id}
              lead={l}
              onStatus={(s) => setStatus(l.id, s)}
              onNote={(n) => saveNote(l.id, n)}
              onDelete={() => remove(l.id)}
            />
          ))}
        </div>
      )}

      {showAdd && (
        <AddLeadModal
          onClose={() => setShowAdd(false)}
          onSave={async (data) => {
            await authFetch("/api/admin/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            setShowAdd(false);
            load(pass);
          }}
        />
      )}
    </main>
  );
}

/* ---------------- lead card ---------------- */
function LeadCard({
  lead: l,
  onStatus,
  onNote,
  onDelete,
}: {
  lead: Lead;
  onStatus: (s: string) => void;
  onNote: (n: string) => void;
  onDelete: () => void;
}) {
  const [note, setNote] = useState(l.notes || "");
  const [dirty, setDirty] = useState(false);
  const stale = isStale(l);
  const waNumber = (l.phone || "").replace(/\D/g, "");
  const wa =
    waNumber.length >= 10
      ? `https://wa.me/${waNumber.length === 10 ? "91" + waNumber : waNumber}`
      : null;

  return (
    <div
      className={`bg-paper rounded-2xl p-5 md:p-6 ${
        stale ? "ring-2 ring-[#C77D2E]" : "ring-1 ring-hairline"
      }`}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="display-tight text-lg text-ink">{l.name}</span>
            <span
              className="inline-flex items-center rounded-full text-white text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1"
              style={{ background: STATUS_COLOR[l.status] || "#5C84B0" }}
            >
              {l.status}
            </span>
            {stale && (
              <span className="inline-flex items-center rounded-full bg-[#C77D2E] text-white text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1">
                ⚠ {daysAgo(l.updated_at)}d — follow up
              </span>
            )}
            {l.source && <span className="text-xs text-slatey">via {l.source}</span>}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/75">
            {l.email && l.email !== "—" && (
              <a href={`mailto:${l.email}`} className="underline-accent">{l.email}</a>
            )}
            {l.phone && <span>· 📞 {l.phone}</span>}
            {l.company && <span>· {l.company}</span>}
            {l.budget && <span>· 💰 {l.budget}</span>}
            {l.timeline && <span>· ⏱ {l.timeline}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold rounded-md bg-[#2E9E5B] text-white px-3 py-1.5 hover:opacity-90"
            >
              WhatsApp
            </a>
          )}
          <span className="text-xs text-slatey whitespace-nowrap">
            {new Date(l.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
          <button
            onClick={onDelete}
            className="text-slatey hover:text-red-600 text-lg leading-none px-1"
            aria-label="Delete lead"
          >
            ×
          </button>
        </div>
      </div>

      {l.interests && l.interests.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {l.interests.map((i) => (
            <span key={i} className="inline-flex rounded-full bg-mist ring-1 ring-hairline px-2.5 py-1 text-xs text-ink/75">
              {i}
            </span>
          ))}
        </div>
      )}

      {l.message && (
        <p className="mt-3 text-sm text-ink/80 leading-relaxed whitespace-pre-wrap bg-mist rounded-lg p-3">
          {l.message}
        </p>
      )}

      {/* notes */}
      <div className="mt-3">
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setDirty(e.target.value !== (l.notes || ""));
          }}
          placeholder="Private notes — e.g. 'called, deciding next week'…"
          className="w-full text-sm rounded-lg ring-1 ring-hairline bg-white p-3 outline-none focus:ring-ink transition-smooth resize-y min-h-[52px]"
        />
        {dirty && (
          <button
            onClick={() => {
              onNote(note);
              setDirty(false);
            }}
            className="mt-1.5 text-xs font-semibold rounded-md bg-ink text-accent px-3 py-1.5"
          >
            Save note
          </button>
        )}
      </div>

      {/* status buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onStatus(s)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-smooth ${
              l.status === s
                ? "bg-ink text-accent"
                : "bg-mist text-ink/60 ring-1 ring-hairline hover:ring-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- add lead modal ---------------- */
function AddLeadModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (d: Record<string, unknown>) => void;
}) {
  const [f, setF] = useState({ name: "", phone: "", email: "", company: "", budget: "", message: "" });
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  return (
    <div className="fixed inset-0 bg-ink/50 grid place-items-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-paper rounded-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="eyebrow text-accent mb-1">Add lead manually</p>
        <h2 className="display-tight text-xl text-ink mb-4">New lead</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!f.name.trim()) return;
            onSave(f);
          }}
          className="flex flex-col gap-3"
        >
          <input className="input-flat" placeholder="Business / name *" value={f.name} onChange={(e) => set("name", e.target.value)} autoFocus />
          <div className="grid grid-cols-2 gap-3">
            <input className="input-flat" placeholder="Phone" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
            <input className="input-flat" placeholder="Email" value={f.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <input className="input-flat" placeholder="Type / area (café, villa…)" value={f.company} onChange={(e) => set("company", e.target.value)} />
          <input className="input-flat" placeholder="Budget (optional)" value={f.budget} onChange={(e) => set("budget", e.target.value)} />
          <textarea className="w-full text-sm rounded-md ring-1 ring-hairline bg-white p-3 outline-none focus:ring-ink min-h-[70px]" placeholder="Notes (where you found them, etc.)" value={f.message} onChange={(e) => set("message", e.target.value)} />
          <div className="flex gap-2 mt-1">
            <button type="submit" className="btn-accent h-[48px] flex-1">
              <span className="font-semibold not-italic">Add lead</span>
            </button>
            <button type="button" onClick={onClose} className="h-[48px] px-5 rounded-md ring-1 ring-hairline text-ink/70 hover:ring-ink">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- bits ---------------- */
function Stat({
  label,
  value,
  color,
  onClick,
}: {
  label: string;
  value: number;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`bg-paper rounded-xl ring-1 ring-hairline p-4 text-left ${
        onClick ? "hover:ring-ink transition-smooth cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="numeral text-3xl leading-none" style={{ color: color || "#101013" }}>
        {value}
      </div>
      <div className="mt-1 eyebrow text-slatey">{label}</div>
    </button>
  );
}

function Chip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-smooth ${
        on ? "bg-ink text-accent" : "bg-paper text-ink/60 ring-1 ring-hairline hover:ring-ink"
      }`}
    >
      {label}
    </button>
  );
}
