"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { capture, getCampaignParameters } from "@/lib/analytics";

type WaitlistFormProps = {
  placement: "hero" | "footer";
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function WaitlistForm({ placement }: WaitlistFormProps) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (placement === "hero") {
      capture("landing_page_viewed", getCampaignParameters());
    }
  }, [placement]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const campaign = getCampaignParameters();
    const emailDomain = email.split("@")[1]?.toLowerCase();

    capture("waitlist_signup_attempted", {
      placement,
      email_domain: emailDomain,
      ...campaign
    });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: form.get("website"),
          campaign
        })
      });

      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        throw new Error(result.error || "We could not add you right now.");
      }

      setState("success");
      setMessage(result.message || "You are on the list. Watch your inbox.");
      setEmail("");
      capture("waitlist_signup_completed", { placement, email_domain: emailDomain, ...campaign });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Please try again.";
      setState("error");
      setMessage(errorMessage);
      capture("waitlist_signup_failed", { placement, reason: "request_failed", ...campaign });
    }
  }

  return (
    <form className="waitlist-form" onSubmit={submit}>
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
