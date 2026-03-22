"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RestaurantImage } from "@/types/restaurant";

const MIN_SLOTS = 6;

type Props = {
  restaurantName: string;
  images: RestaurantImage[];
};

export function PhotoGallery({ restaurantName, images }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<RestaurantImage | null>(null);

  const slots: (RestaurantImage | null)[] = [...images];
  while (slots.length < MIN_SLOTS) {
    slots.push(null);
  }

  return (
    <section id="photos" className="scroll-mt-32 mt-16 lg:mt-20">
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
        Gallery
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3" role="list">
        {slots.map((img, i) => (
          <li key={img?.url ?? `empty-${i}`} className="aspect-[4/3]">
            {img ? (
              <button
                type="button"
                onClick={() => {
                  setSelected(img);
                  setOpen(true);
                }}
                className="relative block h-full w-full overflow-hidden rounded-lg bg-muted ring-1 ring-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Image
                  src={img.url}
                  alt={`${restaurantName} — ${img.alt}`}
                  fill
                  className="object-cover transition-transform hover:scale-[1.02]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </button>
            ) : (
              <div
                className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted text-xs text-muted-foreground"
                aria-hidden
              >
                Coming soon
              </div>
            )}
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden sm:max-w-4xl border-0 bg-black">
          <DialogTitle className="sr-only">
            {restaurantName} — enlarged photo
          </DialogTitle>
          <div className="relative aspect-[4/3] w-full bg-black">
            {selected && (
              <Image
                src={selected.url}
                alt={`${restaurantName} — ${selected.alt}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
