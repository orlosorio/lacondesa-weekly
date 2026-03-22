"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { RestaurantReview } from "@/types/restaurant";

const TRUNCATE = 200;

type Props = {
  reviews?: RestaurantReview[];
};

function ReviewCard({
  review,
}: {
  review: RestaurantReview;
}) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > TRUNCATE;
  const shown =
    expanded || !long ? review.text : `${review.text.slice(0, TRUNCATE).trim()}…`;

  return (
    <li className="border-b border-border pb-6 last:border-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium text-foreground">{review.author}</span>
        <span className="inline-flex items-center gap-0.5 text-amber-600" aria-label={`${review.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.round(review.rating)
                  ? "fill-amber-500 text-amber-500"
                  : "fill-transparent text-muted-foreground/35"
              }`}
              aria-hidden
            />
          ))}
        </span>
        <time
          dateTime={review.date}
          className="text-xs text-muted-foreground"
        >
          {new Date(review.date + "T12:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {shown}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-1 text-sm font-medium text-primary hover:underline underline-offset-2"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </li>
  );
}

export function ReviewList({ reviews }: Props) {
  const hasReviews = reviews && reviews.length > 0;

  return (
    <section className="mt-16 lg:mt-20">
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
        Reviews
      </h2>
      {hasReviews ? (
        <ul className="space-y-6" role="list">
          {reviews!.map((r, i) => (
            <ReviewCard key={`${r.author}-${r.date}-${i}`} review={r} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center">
          Be the first to leave a review
        </p>
      )}
    </section>
  );
}
