import { createCookie } from "@remix-run/node";

export const demoAuthCookie = createCookie("kol-db-demo-auth", {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30,
});

export const DEMO_USER = {
  name: "Demo User",
  role: "admin" as const,
};

