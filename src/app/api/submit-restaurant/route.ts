import { getSanityWriteClient } from "@/sanity/write-client";

const CUISINE_VALUES = new Set([
  "mexican",
  "italian",
  "japanese",
  "mediterranean",
  "cafe",
  "seafood",
  "vegetarian",
  "other",
]);

/**
 * // PHASE 2: Add email field to submission form.
 * // "Notify me if my restaurant wins this month" checkbox.
 * // Store email alongside the submission in Sanity.
 */
export async function POST(request: Request) {
  let writeClient;
  try {
    writeClient = getSanityWriteClient();
  } catch {
    return Response.json(
      { error: "Submissions are temporarily unavailable." },
      { status: 503 }
    );
  }

  let body: {
    name?: string;
    description?: string;
    cuisine?: string;
    submittedBy?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, description, cuisine, submittedBy } = body;

  if (!name?.trim() || !description?.trim()) {
    return Response.json(
      { error: "Name and description are required" },
      { status: 400 }
    );
  }

  if (description.length > 280) {
    return Response.json(
      { error: "Description must be 280 characters or less" },
      { status: 400 }
    );
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const month = new Date().toISOString().slice(0, 7);
  const cuisineVal =
    cuisine && CUISINE_VALUES.has(cuisine) ? cuisine : "other";

  try {
    const doc = await writeClient.create({
      _type: "wallOfLoveRestaurant",
      name: name.trim(),
      slug: { _type: "slug", current: `${slug}-${month}` },
      description: description.trim(),
      cuisine: cuisineVal,
      submittedBy: submittedBy?.trim() || "Anonymous",
      upvotes: 0,
      downvotes: 0,
      approved: false,
      month,
      submittedAt: new Date().toISOString(),
    });

    return Response.json({ success: true, id: doc._id });
  } catch {
    return Response.json({ error: "Submission failed" }, { status: 500 });
  }
}
