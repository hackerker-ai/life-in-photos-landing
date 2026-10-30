"use client";

import { FormEvent, useId, useState } from "react";
import { capture, getCampaignParameters } from "@/lib/analytics";

type Placement = "hero" | "footer" | "invite";

type SubmitState = "idle" | "submitting" | "success" | "error";

/** What /api/waitlist answers with. `code` says which outcome it was, so each page can word it in its own language. */
export type WaitlistResult = {
  ok: boolean;
  code: "joined" | "alreadyJoined" | "joinedEmailDelayed" | "invalid" | "unavailable" | "failed";
  message: string;
};

/**
 * Sends an email to the waitlist and records the signup events. Shared by the waitlist form below and the home page's
 * invitation form.
 */
export function useWaitlistSignup(placement: Placement, locale?: string) {
  const [state, setState] = useState<SubmitState>("idle");

  async function submit(email: string, website: FormDataEntryValue | null): Promise<WaitlistResult> {
    setState("submitting");
    const campaign = getCampaignParameters();
    const emailDomain = email.split("@")[1]?.toLowerCase();
    const context = locale ? { placement, locale } : { placement };

    capture("waitlist_signup_attempted", { ...context, email_domain: emailDomain, ...campaign });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, campaign, locale })
      });

      const result = (await response.json()) as { message?: string; error?: string; code?: WaitlistResult["code"] };
      if (!response.ok) {
        throw Object.assign(new Error(result.error || "We could not add you right now."), { code: result.code || "failed" });
      }

      setState("success");
      capture("waitlist_signup_completed", { ...context, email_domain: emailDomain, ...campaign });
      return { ok: true, code: result.code || "joined", message: result.message || "You are on the list. Watch your inbox." };
    } catch (error) {
      setState("error");
      capture("waitlist_signup_failed", { ...context, reason: "request_failed", ...campaign });
      const code = (error as { code?: WaitlistResult["code"] }).code || "failed";
      return { ok: false, code, message: error instanceof Error ? error.message : "Please try again." };
    }
  }

  return { state, submit };
}

type WaitlistFormProps = {
  placement: "hero" | "footer";
};

export function WaitlistForm({ placement }: WaitlistFormProps) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { state, submit } = useWaitlistSignup(placement);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const result = await submit(email, new FormData(event.currentTarget).get("website"));
    setMessage(result.message);
    if (result.ok) setEmail("");
  }

  return (
    <form className="waitlist-form" onSubmit={onSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${emailId}-website`}>Website</label>
        <input id={`${emailId}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="sr-only" htmlFor={emailId}>
        Email address
      </label>
      <div className="form-row">
        <input
          id={emailId}
          className="ph-no-capture"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={state === "submitting"}
          required
        />
        <button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Joining..." : "Join the waitlist"}
        </button>
      </div>
      <p className="form-note">Early product updates only. Unsubscribe anytime.</p>
      {message ? (
        <p className={`form-message ${state}`} role={state === "error" ? "alert" : "status"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
