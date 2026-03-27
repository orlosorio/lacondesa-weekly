import { defineField, defineType } from "sanity";

/**
 * Wall of Love — community submissions & voting.
 * Named `wallOfLoveRestaurant` because `restaurant` is already used for full
 * directory profiles (`/spots`). Do not rename to `restaurant` without migrating
 * the spots feature.
 */
export const wallOfLoveRestaurant = defineType({
  name: "wallOfLoveRestaurant",
  title: "Wall of Love — Restaurant",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Restaurant Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedBy",
      title: "Submitted By",
      description: "Name of the person who submitted this restaurant.",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Why this restaurant?",
      description: "Short pitch from the person who submitted it. Max 280 characters.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "cuisine",
      title: "Cuisine Type",
      type: "string",
      options: {
        list: [
          { title: "Mexican", value: "mexican" },
          { title: "Italian", value: "italian" },
          { title: "Japanese", value: "japanese" },
          { title: "Mediterranean", value: "mediterranean" },
          { title: "Cafe & Brunch", value: "cafe" },
          { title: "Seafood", value: "seafood" },
          { title: "Vegetarian / Vegan", value: "vegetarian" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "photo",
      title: "Photo",
      description: "Optional photo of the restaurant or a dish.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "upvotes",
      title: "Upvotes",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "downvotes",
      title: "Downvotes",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "approved",
      title: "Approved",
      description: "Toggle to publish submission to the wall. Review before approving.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "month",
      title: "Month",
      description: "Which month this submission belongs to. Format: YYYY-MM",
      type: "string",
      initialValue: () => new Date().toISOString().slice(0, 7),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "photo",
    },
  },

  orderings: [
    {
      title: "Most Votes",
      name: "netVotesDesc",
      by: [{ field: "upvotes", direction: "desc" }],
    },
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
