"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Crown, Loader2, Sparkles } from "lucide-react";
import { client } from "@/sanity/client";
import {
  getCurrentMonth,
  wallOfLoveRestaurantsByMonthQuery,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { getFingerprint } from "@/lib/fingerprint";
import {
  isWallOfLoveDemoId,
  mergeWallOfLoveDemoRows,
} from "@/lib/wall-of-love-demo";
import { getUserVote, recordVote } from "@/lib/voteTracking";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "./wall-of-love.css";

export type WallOfLoveRow = {
  _id: string;
  name: string;
  slug?: string | null;
  submittedBy?: string | null;
  description: string;
  cuisine?: string | null;
  photo?: unknown;
  upvotes: number;
  downvotes: number;
  submittedAt?: string;
  month?: string | null;
};

const CUISINE_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "mexican", label: "Mexican" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "cafe", label: "Cafe & Brunch" },
  { value: "seafood", label: "Seafood" },
  { value: "vegetarian", label: "Vegetarian / Vegan" },
  { value: "other", label: "Other" },
];

const CUISINE_LABEL: Record<string, string> = {
  mexican: "Mexican",
  italian: "Italian",
  japanese: "Japanese",
  mediterranean: "Mediterranean",
  cafe: "Cafe & Brunch",
  seafood: "Seafood",
  vegetarian: "Vegetarian / Vegan",
  other: "Other",
};

function netVotes(r: Pick<WallOfLoveRow, "upvotes" | "downvotes">): number {
  return r.upvotes - r.downvotes;
}

function monthLabel(ym: string): string {
  const d = new Date(`${ym}-01T12:00:00`);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function WallOfLoveClient() {
  const [restaurants, setRestaurants] = useState<WallOfLoveRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<"top" | "newest">("top");
  const [banner, setBanner] = useState<string | null>(null);
  const [votingId, setVotingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitOk, setSubmitOk] = useState(false);
  const [submitErr, setSubmitErr] = useState(false);

  const [fname, setFname] = useState("");
  const [fdesc, setFdesc] = useState("");
  const [fcuisine, setFcuisine] = useState("");
  const [fby, setFby] = useState("");

  const month = getCurrentMonth();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await client.fetch<WallOfLoveRow[]>(
          wallOfLoveRestaurantsByMonthQuery,
          { month }
        );
        if (!cancelled)
          setRestaurants(mergeWallOfLoveDemoRows(month, data ?? []));
      } catch {
        if (!cancelled) setRestaurants([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [month]);

  useEffect(() => {
    if (!banner) return;
    const t = window.setTimeout(() => setBanner(null), 4500);
    return () => window.clearTimeout(t);
  }, [banner]);

  const displayed = useMemo(() => {
    let list = restaurants.filter(
      (r) => filter === "all" || r.cuisine === filter
    );
    list = [...list].sort((a, b) => {
      if (sort === "top") return netVotes(b) - netVotes(a);
      const ta = new Date(a.submittedAt ?? 0).getTime();
      const tb = new Date(b.submittedAt ?? 0).getTime();
      return tb - ta;
    });
    return list;
  }, [restaurants, filter, sort]);

  const topForPodium = useMemo(() => {
    const sorted = [...restaurants].sort(
      (a, b) => netVotes(b) - netVotes(a)
    );
    return sorted.slice(0, 3);
  }, [restaurants]);

  const podiumOrder = useMemo(() => {
    if (topForPodium.length >= 3)
      return [topForPodium[1], topForPodium[0], topForPodium[2]];
    if (topForPodium.length === 2) return [topForPodium[1], topForPodium[0]];
    return topForPodium;
  }, [topForPodium]);

  const showMessage = useCallback((msg: string) => {
    setBanner(msg);
  }, []);

  const handleVote = useCallback(
    async (restaurantId: string, voteType: "upvote" | "downvote") => {
      /*
       * PHASE 2: Replace localStorage + fingerprint vote tracking with authenticated user votes.
       * Before calling the vote API, check if user is logged in.
       * If not logged in, show a modal: "Sign in to vote — it only takes a second."
       */

      const existingLocalVote = getUserVote(restaurantId);
      if (existingLocalVote) {
        showMessage("Looks like you already voted for this one!");
        return;
      }

      if (isWallOfLoveDemoId(restaurantId)) {
        setVotingId(restaurantId);
        recordVote(restaurantId, voteType);
        setRestaurants((prev) =>
          prev.map((r) =>
            r._id === restaurantId
              ? {
                  ...r,
                  upvotes:
                    voteType === "upvote" ? r.upvotes + 1 : r.upvotes,
                  downvotes:
                    voteType === "downvote" ? r.downvotes + 1 : r.downvotes,
                }
              : r
          )
        );
        setVotingId(null);
        return;
      }

      setVotingId(restaurantId);
      let fingerprint: string | undefined;
      try {
        fingerprint = await getFingerprint();
      } catch {
        fingerprint = undefined;
      }

      try {
        const res = await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ restaurantId, voteType, fingerprint }),
        });

        if (res.status === 429) {
          const data = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          const rateLimited =
            data.error === "Too many requests. Slow down.";
          if (rateLimited) {
            showMessage("Slow down — try again in a minute.");
          } else {
            showMessage("Looks like you already voted for this one!");
            recordVote(restaurantId, voteType);
          }
          return;
        }

        if (!res.ok) {
          showMessage("Something went wrong. Try again?");
          return;
        }

        recordVote(restaurantId, voteType);
        setRestaurants((prev) =>
          prev.map((r) =>
            r._id === restaurantId
              ? {
                  ...r,
                  upvotes:
                    voteType === "upvote" ? r.upvotes + 1 : r.upvotes,
                  downvotes:
                    voteType === "downvote" ? r.downvotes + 1 : r.downvotes,
                }
              : r
          )
        );
      } catch {
        showMessage("Something went wrong. Try again?");
      } finally {
        setVotingId(null);
      }
    },
    [showMessage]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitErr(false);
    setSubmitOk(false);
    try {
      const res = await fetch("/api/submit-restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fname,
          description: fdesc,
          cuisine: fcuisine || undefined,
          submittedBy: fby || undefined,
        }),
      });
      if (res.ok) {
        setSubmitOk(true);
        setFname("");
        setFdesc("");
        setFcuisine("");
        setFby("");
      } else {
        setSubmitErr(true);
      }
    } catch {
      setSubmitErr(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="wall-of-love-page min-h-screen pt-20">
      {banner && (
        <div
          className="fixed top-20 left-1/2 z-40 max-w-md -translate-x-1/2 rounded-lg border border-border bg-card px-4 py-3 text-center text-sm shadow-lg"
          role="status"
        >
          {banner}
        </div>
      )}

      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) {
            setSubmitOk(false);
            setSubmitErr(false);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Nominate a spot
            </DialogTitle>
          </DialogHeader>
          {submitOk ? (
            <p className="text-muted-foreground py-2">
              Thanks! We&apos;ll review your submission and add it to the wall
              soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label
                  htmlFor="wol-name"
                  className="text-sm font-medium text-foreground"
                >
                  Restaurant name{" "}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  id="wol-name"
                  className="mt-1.5"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                  maxLength={120}
                  placeholder="e.g. Contramar"
                />
              </div>
              <div>
                <label
                  htmlFor="wol-why"
                  className="text-sm font-medium text-foreground"
                >
                  Why do you love it?{" "}
                  <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="wol-why"
                  className={cn(
                    "mt-1.5 flex min-h-[100px] w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none",
                    "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  )}
                  value={fdesc}
                  onChange={(e) => setFdesc(e.target.value)}
                  required
                  maxLength={280}
                  rows={4}
                  placeholder="In a sentence or two — what keeps you coming back?"
                />
                <p className="mt-1 text-xs text-muted-foreground text-right tabular-nums">
                  {fdesc.length}/280
                </p>
              </div>
              <div>
                <label
                  htmlFor="wol-cuisine"
                  className="text-sm font-medium text-foreground"
                >
                  Cuisine (optional)
                </label>
                <select
                  id="wol-cuisine"
                  className="mt-1.5 flex h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={fcuisine}
                  onChange={(e) => setFcuisine(e.target.value)}
                >
                  <option value="">Choose…</option>
                  {CUISINE_OPTIONS.filter((o) => o.value !== "all").map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="wol-by"
                  className="text-sm font-medium text-foreground"
                >
                  Your name (optional)
                </label>
                <Input
                  id="wol-by"
                  className="mt-1.5"
                  value={fby}
                  onChange={(e) => setFby(e.target.value)}
                  placeholder="Anonymous"
                  maxLength={80}
                />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All submissions are reviewed before appearing on the wall.
              </p>
              {submitErr && (
                <p className="text-sm text-destructive">
                  Something went wrong. Try again?
                </p>
              )}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Sending…
                  </span>
                ) : (
                  "Submit for Review"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <section className="wall-of-love-hero wall-cork-texture border-b border-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 text-center">
          <p className="text-sm font-medium tracking-wide text-primary uppercase mb-3">
            Community pick
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight text-balance">
            Wall of Love
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            La Condesa&apos;s favorite restaurants, ranked by the neighborhood.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {monthLabel(month)}
            </span>
            <Button
              type="button"
              size="lg"
              className="font-medium"
              onClick={() => {
                setFormOpen(true);
                setSubmitOk(false);
              }}
            >
              Submit a Restaurant
            </Button>
          </div>
        </div>
      </section>

      {/* Podium */}
      <section className="py-10 lg:py-12 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6 text-center">
            This month&apos;s leaderboard
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-36 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : topForPodium.length === 0 ? (
            <p className="text-center text-muted-foreground max-w-md mx-auto">
              No picks yet — be the first to submit a restaurant this month.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center items-end gap-4 md:gap-6 max-w-5xl mx-auto">
              {podiumOrder.map((r) => {
                const isFirst =
                  topForPodium.length >= 3
                    ? r._id === topForPodium[0]._id
                    : topForPodium.length === 2
                      ? r._id === topForPodium[0]._id
                      : true;
                const rank =
                  topForPodium.findIndex((x) => x._id === r._id) + 1;
                return (
                  <div
                    key={r._id}
                    className={cn(
                      "podium-card rounded-2xl border border-border bg-card p-5 w-full sm:w-[calc(33.333%-1rem)] max-w-xs",
                      isFirst && "podium-card--gold md:scale-105 md:-translate-y-1 z-10 border-primary/20"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        #{rank}
                      </span>
                      {isFirst && (
                        <Crown
                          className="h-5 w-5 text-amber-600 shrink-0"
                          aria-hidden
                        />
                      )}
                    </div>
                    <p className="font-serif text-lg font-semibold text-foreground line-clamp-2">
                      {r.name}
                    </p>
                    <p className="mt-1 font-serif text-2xl tabular-nums text-primary">
                      {netVotes(r) > 0 ? "+" : ""}
                      {netVotes(r)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground self-center mr-1">
              Sort:
            </span>
            {(
              [
                ["top", "Top voted"],
                ["newest", "Newest"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setSort(k)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors border",
                  sort === k
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Cuisine:</span>
            <div className="flex flex-wrap gap-1.5">
              {CUISINE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setFilter(o.value)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium transition-colors border",
                    filter === o.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent bg-secondary text-muted-foreground hover:bg-secondary/80"
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 lg:py-16 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : displayed.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-dashed border-border bg-card/50">
              <Sparkles className="h-10 w-10 mx-auto text-primary/60 mb-4" />
              <p className="font-serif text-xl text-foreground mb-2">
                Nothing matches that filter
              </p>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Try another cuisine, or check back as more spots get approved.
              </p>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-6 list-none p-0 m-0">
              {displayed.map((r) => {
                const photo = r.photo;
                const img =
                  photo && typeof photo === "object"
                    ? urlFor(photo).width(800).height(400).quality(85).url()
                    : null;
                const uv = getUserVote(r._id);
                const nv = netVotes(r);
                const busy = votingId === r._id;
                return (
                  <li
                    key={r._id}
                    className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {img ? (
                      <div className="relative h-[200px] w-full bg-muted">
                        <Image
                          src={img}
                          alt={r.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <div className="h-[120px] bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center">
                        <span className="font-serif text-2xl text-primary/40">
                          {r.name.slice(0, 1)}
                        </span>
                      </div>
                    )}
                    <div className="p-5 lg:p-6 flex flex-1 flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {r.name}
                          </h3>
                          {r.cuisine && (
                            <span className="inline-block mt-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                              {CUISINE_LABEL[r.cuisine] ?? r.cuisine}
                            </span>
                          )}
                        </div>
                        <div className="vote-block shrink-0">
                          <button
                            type="button"
                            className={cn(
                              "vote-btn upvote",
                              uv === "upvote" && "active"
                            )}
                            onClick={() => handleVote(r._id, "upvote")}
                            disabled={!!uv || busy}
                            aria-label="Upvote"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                          <span className="net-score">{nv}</span>
                          <button
                            type="button"
                            className={cn(
                              "vote-btn downvote",
                              uv === "downvote" && "active"
                            )}
                            onClick={() => handleVote(r._id, "downvote")}
                            disabled={!!uv || busy}
                            aria-label="Downvote"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {r.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Suggested by{" "}
                        <span className="font-medium text-foreground">
                          {r.submittedBy || "Anonymous"}
                        </span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Bottom submit CTA */}
      <section className="py-14 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold mb-3">
            Know a place worth the hype?
          </h2>
          <p className="text-primary-foreground/85 text-sm mb-6">
            Nominations are free. We review every submission before it goes
            live.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              setFormOpen(true);
              setSubmitOk(false);
            }}
          >
            Submit a Restaurant
          </Button>
        </div>
      </section>
    </div>
  );
}
