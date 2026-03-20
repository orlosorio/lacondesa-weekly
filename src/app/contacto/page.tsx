"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SUBJECT_OPTIONS = [
  "Feedback or comment",
  "Editorial proposal",
  "Partnership or sponsorship",
  "Correction or error",
  "Other",
];

const MIN_MESSAGE = 20;
const MAX_MESSAGE = 1000;

export default function ContactoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    const errs: string[] = [];
    if (!name.trim() || name.trim().length < 2) errs.push("Name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.push("Valid email");
    if (!SUBJECT_OPTIONS.includes(subject)) errs.push("Reason for contact");
    if (!message.trim() || message.trim().length < MIN_MESSAGE) {
      errs.push(`Message (min. ${MIN_MESSAGE} characters)`);
    }
    if (message.length > MAX_MESSAGE) {
      errs.push(`Message max ${MAX_MESSAGE} characters`);
    }

    if (errs.length) {
      setStatus("error");
      setErrorMessage(errs.join(". "));
      return;
    }

    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim(),
        newsletter,
        website: website || undefined,
      }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setErrorMessage(
        typeof data.error === "string"
          ? data.error
          : "We couldn’t send your message. Please try again later."
      );
      return;
    }
    setStatus("success");
  };

  if (status === "success") {
    return (
      <main className="pt-20 lg:pt-24 min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4">
            Thanks, {name.trim() || "you"}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            We&apos;ll read your note and get back to you soon.
          </p>
        </div>
      </main>
    );
  }

  const inputClass =
    "w-full border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <header className="mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Get in touch
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Readers, advertisers, collaborators — all welcome. We read and respond to every message.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            {errorMessage && (
              <div className="mb-6 p-4 border border-destructive/50 bg-destructive/5 text-destructive text-sm">
                {errorMessage}
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Name *</label>
                <Input
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <Input
                  type="email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Reason for contact *</label>
                <select
                  className={inputClass}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Select</option>
                  {SUBJECT_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>
                  Message * (min. {MIN_MESSAGE}, max. {MAX_MESSAGE})
                </label>
                <textarea
                  className={`${inputClass} min-h-[160px] resize-y`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={MAX_MESSAGE}
                  rows={6}
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="h-4 w-4 border-border"
                />
                <label htmlFor="newsletter" className="text-sm text-foreground">
                  I&apos;d like to receive the La Condesa newsletter
                </label>
              </div>
              {/* Honeypot - hidden from users, bots may fill it */}
              <div className="opacity-0 h-0 w-0 overflow-hidden absolute pointer-events-none" aria-hidden>
                <label htmlFor="website-hp">Website</label>
                <input
                  id="website-hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="w-full sm:w-auto min-w-[160px] py-3"
              >
                {status === "loading" ? "Sending…" : "Send message"}
              </Button>
            </div>
          </div>
          <div className="lg:pl-8 border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0">
            <p className="font-serif text-lg text-foreground mb-4">
              La Condesa, Mexico City
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We&apos;re a neighborhood publication focused on La Condesa. If you have something to share — a new place, a correction, an idea for a story or a collaboration — write to us. No bots: a person reads every message.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
