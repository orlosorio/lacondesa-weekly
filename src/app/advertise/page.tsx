"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, Users, Mail, MapPin, TrendingUp } from "lucide-react";

const stats = [
  { label: "Active Subscribers", sublabel: "Growing every week", value: "2,000+", icon: Users },
  { label: "Open Rate", sublabel: "Industry avg: 21%", value: "52%", icon: Mail },
  { label: "Local Readers", sublabel: "Live in La Condesa/Roma", value: "85%", icon: MapPin },
  { label: "Click Rate", sublabel: "Highly engaged audience", value: "28%", icon: TrendingUp },
];

const tiers = [
  {
    name: "Promoted Event",
    price: "$75-100",
    period: "per issue",
    description: "Perfect for events and limited-time offers",
    features: [
      "Ideal for local businesses and venues",
      "Link to event page or tickets",
      "Event name, date, and brief description",
      "Text listing in events section",
    ],
    popular: false,
  },
  {
    name: "Standard Banner",
    price: "$150-200",
    period: "per issue",
    description: "Effective mid-newsletter placement",
    features: [
      "Placed between content sections",
      "Link to your website or landing page",
      "One-line description text",
      "Banner image (600x150px)",
    ],
    popular: false,
  },
  {
    name: "Premium Featured",
    price: "$250-400",
    period: "per issue",
    description: "Maximum visibility at the top of the newsletter",
    features: [
      "Top placement above editorial content",
      "Custom CTA button",
      "Headline and body text (up to 100 words)",
      "Featured image (600x300px)",
    ],
    popular: true,
  },
];

export default function AdvertisePage() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    placement: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Advertise form:", formData);
    setFormStatus("success");
  };

  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Reach La Condesa&apos;s Most Engaged Audience
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with thousands of locals who are actively looking for new
            places to eat, drink, shop, and explore in the neighborhood.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary border-t border-border py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <p className="font-serif text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-lg text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Ad Placement Options
            </h2>
            <p className="text-muted-foreground">
              Choose the format that works best for your business. All placements
              include performance reporting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border bg-card p-6 ${
                  tier.popular
                    ? "border-primary shadow-lg ring-1 ring-primary/20"
                    : "border-border"
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground hover:bg-primary/90">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {tier.description}
                </p>
                <div className="mb-6">
                  <span className="font-serif text-3xl font-semibold text-foreground">
                    {tier.price}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad example mockup */}
      <section className="bg-secondary border-t border-border py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4 text-center">
            What Your Ad Looks Like
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Here&apos;s an example of a Premium Featured placement in our
            newsletter.
          </p>
          <div className="rounded-xl border border-border bg-card p-6 max-w-lg mx-auto">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Sponsored
            </p>
            <div className="rounded-lg bg-secondary h-40 mb-4 flex items-center justify-center text-muted-foreground text-sm">
              Featured image (600x300)
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              Experience Authentic Oaxacan Cuisine
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our new tasting menu celebrates the flavors of Oaxaca with locally
              sourced ingredients. Available Thursday through Sunday.
            </p>
            <div className="inline-flex items-center justify-center rounded-md h-9 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium">
              Book a Table
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground">
              Tell us about your business and we&apos;ll get back to you within
              24 hours.
            </p>
          </div>

          {formStatus === "success" ? (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <p className="text-lg font-medium text-foreground">
                Thanks for reaching out.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ll review your inquiry and get back to you within 24
                hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Business Name
                  </label>
                  <input
                    required
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="w-full rounded-md border border-border bg-white h-10 px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Contact Name
                  </label>
                  <input
                    required
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    className="w-full rounded-md border border-border bg-white h-10 px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-md border border-border bg-white h-10 px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Which placement interests you?
                </label>
                <select
                  required
                  value={formData.placement}
                  onChange={(e) =>
                    setFormData({ ...formData, placement: e.target.value })
                  }
                  className="w-full rounded-md border border-border bg-white h-10 px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                >
                  <option value="">Select a placement</option>
                  <option value="promoted-event">Promoted Event</option>
                  <option value="standard-banner">Standard Banner</option>
                  <option value="premium-featured">Premium Featured</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Tell us about your business
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                />
              </div>

              <Button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {formStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Get in Touch"
                )}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
