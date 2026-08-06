import { isValidPhoneNumber } from "libphonenumber-js";

/**
 * Validate a phone number per the destination country's real format
 * (not just digit count). National numbers with no "+" are assumed to be
 * Indian; numbers starting with "+" are validated against their own
 * country code. So "9876543210" and "+919876543210" are valid, but
 * "+91628303110" (9-digit Indian national) is correctly rejected.
 */
export function isValidPhone(value: string | null | undefined): boolean {
  const v = (value || "").trim();
  if (!v) return false;
  try {
    return isValidPhoneNumber(v, "IN");
  } catch {
    return false;
  }
}
