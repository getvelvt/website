"use client";

import { useWaitlist } from "@/components/WaitlistProvider";
import type { PlanId } from "@/lib/site";
import { cn } from "@/lib/utils";

type InviteButtonProps = {
  plan?: PlanId;
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
};

const variants = {
  primary:
    "inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-[13px] font-medium text-signal-foreground transition hover:opacity-90",
  outline:
    "inline-flex items-center justify-center rounded-md border border-border-strong px-4 py-2.5 text-[13px] font-medium text-foreground transition hover:bg-surface",
  ghost: "inline bg-transparent p-0 text-signal underline-offset-2 hover:underline",
};

export function InviteButton({
  plan,
  className,
  children,
  variant = "primary",
}: InviteButtonProps) {
  const { openWaitlist } = useWaitlist();

  return (
    <button type="button" onClick={() => openWaitlist(plan)} className={cn(variants[variant], className)}>
      {children}
    </button>
  );
}
