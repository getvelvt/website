"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { WaitlistDialog } from "@/components/WaitlistDialog";
import type { PlanId } from "@/lib/site";

type WaitlistContextValue = {
  open: boolean;
  defaultPlan: PlanId | undefined;
  openWaitlist: (plan?: PlanId) => void;
  closeWaitlist: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [defaultPlan, setDefaultPlan] = useState<PlanId | undefined>();

  const openWaitlist = useCallback((plan?: PlanId) => {
    setDefaultPlan(plan);
    setOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ open, defaultPlan, openWaitlist, closeWaitlist }),
    [open, defaultPlan, openWaitlist, closeWaitlist],
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistDialog />
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return ctx;
}
