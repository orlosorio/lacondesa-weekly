"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { EmailSignup } from "@/components/email-signup";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (shown) return;
      if (e.clientY <= 5) {
        setOpen(true);
        setShown(true);
      }
    },
    [shown]
  );

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("exit-intent-shown");
    if (alreadyShown) {
      setShown(true);
      return;
    }

    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  useEffect(() => {
    if (shown) {
      sessionStorage.setItem("exit-intent-shown", "true");
      document.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [shown, handleMouseLeave]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-xl border-border bg-cream p-8 sm:p-10">
        <DialogTitle className="sr-only">Subscribe to La Condesa Weekly</DialogTitle>
        <div className="text-center">
          <p className="font-heading text-3xl text-foreground">
            Before you go...
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Get the best of La Condesa delivered to your inbox every Thursday.
            Free, curated, and written by people who actually live here.
          </p>
        </div>
        <div className="mt-6">
          <EmailSignup variant="hero" />
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Join 2,000+ Condesa insiders. Unsubscribe anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
