"use client";

import { useState } from "react";
import { Loader2, Check, Share2 } from "lucide-react";

interface EmailSignupProps {
  variant?: "default" | "hero" | "inline" | "compact";
  ctaText?: string;
  showSocialProof?: boolean;
  socialProofText?: string;
  className?: string;
}

export function EmailSignup({
  variant = "default",
  ctaText = "Subscribe - It's Free",
  showSocialProof = false,
  socialProofText = "Join 2,000+ Condesa insiders",
  className = "",
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(typeof data?.error === "string" ? data.error : "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground">
            You&apos;re in! Check your inbox.
          </p>
          <p className="text-sm text-muted-foreground">
            Your first issue arrives this Thursday.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Share with a neighbor:
            </span>
            <button
              onClick={() => {
                navigator.share?.({
                  title: "La Condesa Weekly",
                  text: "Check out this newsletter about La Condesa",
                  url: "https://lacondesa.mx",
                }).catch(() => {});
              }}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Share"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "hero" || variant === "default") {
    return (
      <div className={`w-full ${className}`}>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 flex-col sm:flex-row"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className="w-full min-w-0 rounded-md border bg-white border-border h-12 text-base px-4 shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground font-medium whitespace-nowrap h-12 px-8 text-base"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              ctaText
            )}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
        )}
        {showSocialProof && (
          <p className="text-sm text-muted-foreground mt-3">
            {socialProofText}
          </p>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex gap-2 ${className}`}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="w-full min-w-0 rounded-md border bg-white border-border h-10 text-base px-3 shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground font-medium whitespace-nowrap h-10 px-4"
        >
          {status === "loading" ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
    );
  }

  // Inline variant (for blog articles)
  return (
    <div
      className={`p-6 bg-secondary rounded-lg border border-border ${className}`}
    >
      <p className="text-foreground font-medium mb-4">
        Like discovering places like this? Get the best of La Condesa in your
        inbox every week.
      </p>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 flex-row"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className="w-full min-w-0 rounded-md border bg-white border-border h-10 text-base px-3 shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground font-medium whitespace-nowrap h-10 px-4"
          >
            {status === "loading" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              "Subscribe Free"
            )}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
