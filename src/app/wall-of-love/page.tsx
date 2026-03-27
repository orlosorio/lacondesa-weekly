import type { Metadata } from "next";
import { WallOfLoveClient } from "./wall-of-love-client";

export const metadata: Metadata = {
  title: "Wall of Love",
  description:
    "La Condesa's favorite restaurants, ranked by the neighborhood — vote for your picks and nominate new spots.",
};

export default function WallOfLovePage() {
  return <WallOfLoveClient />;
}
