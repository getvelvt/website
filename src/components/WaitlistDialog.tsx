"use client";

import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useWaitlist } from "@/components/WaitlistProvider";
import { PLANS, SITE, type PlanId } from "@/lib/site";
import { submitWaitlist } from "@/lib/waitlist";

export function WaitlistDialog() {
  const { open, defaultPlan, closeWaitlist } = useWaitlist();
  const submit = useServerFn(submitWaitlist);
  const [pending, setPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<PlanId>("undecided");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [referral, setReferral] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open && defaultPlan) {
      setPlan(defaultPlan);
    }
  }, [open, defaultPlan]);

  function resetForm() {
    setName("");
    setEmail("");
    setPlan(defaultPlan ?? "undecided");
    setRole("");
    setCompany("");
    setReferral("");
    setNotes("");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const result = await submit({
        data: {
          name,
          email,
          plan,
          role: role || undefined,
          company: company || undefined,
          referral: referral || undefined,
          notes: notes || undefined,
          website: "",
        },
      });

      if (result.ok) {
        toast.success("You're on the list", {
          description: "We'll reach out at " + email + " when your invite is ready.",
        });
        resetForm();
        closeWaitlist();
        return;
      }

      if (result.code === "already_registered") {
        toast.message("Already on the waitlist", {
          description: "We already have " + email + ". We'll be in touch soon.",
        });
        closeWaitlist();
        return;
      }

      if (result.code === "rate_limited") {
        toast.error("Please wait a moment", {
          description: "Try again in about a minute.",
        });
        return;
      }

      toast.error("Couldn't save your request", {
        description: "Email us at " + SITE.email.waitlist + " and we'll add you manually.",
      });
    } catch {
      toast.error("Something went wrong", {
        description: "Try again or email " + SITE.email.waitlist,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && closeWaitlist()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-surface sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Request beta access</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Private beta is rolling out in waves. Join the waitlist — we only ask for what we need.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitlist-name">Name</Label>
            <Input
              id="waitlist-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              autoComplete="name"
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitlist-email">Email</Label>
            <Input
              id="waitlist-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
              autoComplete="email"
              placeholder={"you@" + SITE.domain}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label>Plan of interest</Label>
            <Select value={plan} onValueChange={(v) => setPlan(v as PlanId)}>
              <SelectTrigger className="border-border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-surface-elevated">
                {PLANS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="waitlist-role">Role (optional)</Label>
              <Input
                id="waitlist-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                maxLength={100}
                placeholder="Engineer, founder…"
                className="border-border bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waitlist-company">Company (optional)</Label>
              <Input
                id="waitlist-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                maxLength={100}
                className="border-border bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitlist-referral">How did you hear about us? (optional)</Label>
            <Input
              id="waitlist-referral"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              maxLength={200}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitlist-notes">Anything else? (optional)</Label>
            <Textarea
              id="waitlist-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
              rows={3}
              className="resize-none border-border bg-background"
            />
          </div>

          <p className="text-[11px] leading-relaxed text-muted-foreground">
            By joining, you agree we may email you about Velvt beta access. Data is stored securely
            and never sold. Questions?{" "}
            <a href={"mailto:" + SITE.email.hello} className="text-signal hover:underline">
              {SITE.email.hello}
            </a>
          </p>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-4 py-2.5 text-[13px] font-medium text-signal-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Joining…
              </>
            ) : (
              "Join waitlist"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
