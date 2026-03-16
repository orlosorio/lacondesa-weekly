import Link from "next/link";
import { EmailSignup } from "@/components/email-signup";
import { Utensils, Calendar, Gem } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Subscribe to La Condesa Weekly — a free weekly newsletter with the best of La Condesa, Mexico City.",
};

const benefits = [
  {
    icon: Utensils,
    text: "New restaurants, cafes, and bars opening in the neighborhood",
  },
  {
    icon: Calendar,
    text: "Curated weekend picks and events worth your time",
  },
  {
    icon: Gem,
    text: "Hidden gems and local favorites you won't find elsewhere",
  },
];

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex items-center pt-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance mb-6">
          Your weekly guide to the best of La Condesa
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of neighbors who start their Thursday with the best of
          what&apos;s happening in the neighborhood.
        </p>

        <div className="max-w-md mx-auto mb-10">
          <EmailSignup
            variant="hero"
            ctaText="Subscribe - It's Free"
            showSocialProof
            socialProofText="Join 2,000+ Condesa insiders"
          />
        </div>

        {/* Benefits */}
        <div className="space-y-4 text-left max-w-sm mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit.text} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <benefit.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Free forever. Unsubscribe anytime. No spam, ever.
        </p>
      </div>
    </div>
  );
}
