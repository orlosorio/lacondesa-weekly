const STORAGE_KEY = "wall_of_love_votes";

/** Returns the full vote map: { restaurantId: 'upvote' | 'downvote' } */
export function getVoteMap(): Record<string, "upvote" | "downvote"> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    const out: Record<string, "upvote" | "downvote"> = {};
    for (const [id, v] of Object.entries(parsed)) {
      if (v === "upvote" || v === "downvote") out[id] = v;
    }
    return out;
  } catch {
    return {};
  }
}

/** Returns 'upvote', 'downvote', or null for a given restaurant */
export function getUserVote(restaurantId: string): "upvote" | "downvote" | null {
  return getVoteMap()[restaurantId] ?? null;
}

/** Records a vote locally (Layer 1 — casual repeat clicks) */
export function recordVote(restaurantId: string, voteType: "upvote" | "downvote"): void {
  const map = getVoteMap();
  map[restaurantId] = voteType;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}
