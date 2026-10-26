"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { EmailSignup } from "@/components/email-signup";

export function ExitIntentPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shown = useRef(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (shown.current || sessionStorage.getItem("exit-intent-shown")) return;
      if (e.clientY <= 5) {
        shown.current = true;
        sessionStorage.setItem("exit-intent-shown", "true");
        setOpen(true);
      }
    },
    []
  );

  useEffect(() => {
    if (pathname === "/") return;
    const alreadyShown = sessionStorage.getItem("exit-intent-shown");
    if (alreadyShown) {
      return;
    }

    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave, pathname]);

  if (pathname === "/") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[min(700px,calc(100vw-2rem))] max-w-[min(700px,calc(100vw-2rem))] sm:max-w-[min(700px,calc(100vw-2rem))] rounded-2xl border border-border bg-background p-8 shadow-xl sm:p-12 md:p-16">
        <DialogTitle className="sr-only">Subscribe to La Condesa Weekly</DialogTitle>
        <div className="text-center">
          <p className="font-heading text-[40px] text-foreground text-balance">
            Before you go...
          </p>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto sm:max-w-3xl md:max-w-none">
            Get the best of La Condesa delivered to your inbox every Thursday.
            Free, curated, and written by people who actually live here.
          </p>
        </div>
        <div className="mt-10">
          <EmailSignup variant="popup" />
          <p className="mt-6 text-center text-base text-muted-foreground">
            Join 2,000+ Condesa insiders. Unsubscribe anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
