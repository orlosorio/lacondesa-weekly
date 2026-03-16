"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-fade-in-up sm:left-6 sm:right-auto">
      <div className="rounded-xl border border-border bg-card p-4 shadow-lg">
        <p className="text-sm text-foreground">
          We use cookies to improve your experience on our site.
        </p>
        <div className="mt-3 flex gap-2">
          <Button
            onClick={handleAccept}
            className="h-8 rounded-md bg-forest px-4 text-xs font-medium text-cream hover:bg-forest-light"
          >
            Accept
          </Button>
          <Button
            onClick={handleDecline}
            variant="outline"
            className="h-8 rounded-md border-border px-4 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
