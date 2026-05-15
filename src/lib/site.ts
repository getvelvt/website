export const SITE = {
  name: "Velvt",
  domain: "getvelvt.com",
  url: "https://getvelvt.com",
  email: {
    hello: "hello@getvelvt.com",
    press: "press@getvelvt.com",
    security: "security@getvelvt.com",
    waitlist: "waitlist@getvelvt.com",
  },
} as const;

export const PLANS = [
  { id: "unsealed", label: "Unsealed (free)" },
  { id: "velvt-vault", label: "Velvt Vault ($6/mo)" },
  { id: "sovereign", label: "Sovereign ($49 once)" },
  { id: "undecided", label: "Not sure yet" },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];
