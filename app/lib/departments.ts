export const DEPARTMENTS = ["AE", "KOL", "Tech", "Media", "其他"] as const;
export type Department = (typeof DEPARTMENTS)[number];
