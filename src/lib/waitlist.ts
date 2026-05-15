import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

import { waitlistInputSchema } from "@/lib/waitlist-schema";

type WaitlistResult =
  | { ok: true }
  | { ok: false; code: "already_registered" | "rate_limited" | "storage_unavailable" };

async function getDb(): Promise<D1Database | null> {
  try {
    const { env } = await import("cloudflare:workers");
    return (env as Env).DB ?? null;
  } catch {
    return null;
  }
}

async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function clientIp(): string {
  return (
    getRequestHeader("cf-connecting-ip") ??
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export const submitWaitlist = createServerFn({ method: "POST" })
  .inputValidator(waitlistInputSchema)
  .handler(async ({ data }): Promise<WaitlistResult> => {
    if (data.website) {
      return { ok: true };
    }

    const db = await getDb();
    if (!db) {
      return { ok: false, code: "storage_unavailable" };
    }

    const email = data.email.toLowerCase();
    let salt = "velvt-waitlist-dev";
    try {
      const { env } = await import("cloudflare:workers");
      salt = (env as Env).WAITLIST_RATE_SALT ?? salt;
    } catch {
      /* local / non-worker */
    }
    const ipHash = await hashIp(clientIp(), salt);
    const ua = getRequestHeader("user-agent")?.slice(0, 512) ?? null;

    const recent = await db
      .prepare(
        `SELECT 1 FROM waitlist WHERE ip_hash = ? AND created_at > datetime('now', '-60 seconds') LIMIT 1`,
      )
      .bind(ipHash)
      .first();

    if (recent) {
      return { ok: false, code: "rate_limited" };
    }

    try {
      await db
        .prepare(
          `INSERT INTO waitlist (email, name, plan, role, company, referral, notes, ip_hash, user_agent)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          email,
          data.name,
          data.plan,
          data.role || null,
          data.company || null,
          data.referral || null,
          data.notes || null,
          ipHash,
          ua,
        )
        .run();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("UNIQUE") || message.includes("unique")) {
        return { ok: false, code: "already_registered" };
      }
      throw err;
    }

    return { ok: true };
  });
