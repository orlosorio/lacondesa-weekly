import { defineField, defineType } from "sanity";

export const newOpening = defineType({
  name: "newOpening",
  title: "New Opening",
  type: "document",
  liveEdit: true,
  fields: [
    defineField({
      name: "title",
      title: "Name of place",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "neighborhood",
      title: "Neighborhood",
      type: "string",
      description: "e.g. La Condesa, Roma Norte, Juárez",
    }),
    defineField({
      name: "openedAt",
      title: "Opening date",
      type: "date",
      description: "When this spot opened (used for sorting, newest first).",
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "1–2 sentences shown in the homepage carousel.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Restaurant", value: "Restaurant" },
          { title: "Cafe", value: "Cafe" },
          { title: "Bar", value: "Bar" },
          { title: "Bakery", value: "Bakery" },
          { title: "Shop", value: "Shop" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "article",
      title: "Related article (optional)",
      type: "reference",
      to: [{ type: "article" }],
      description: "Link to a full write-up if you have one.",
    }),
    defineField({
      name: "externalUrl",
      title: "Website or maps link (optional)",
      type: "url",
      description: "External site, Google Maps, or Instagram link.",
    }),
    defineField({
      name: "highlighted",
      title: "Highlight on homepage",
      type: "boolean",
      description: "Turn on to feature this in the New Openings carousel.",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "openedAtDesc",
      by: [{ field: "openedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "neighborhood",
      media: "image",
    },
  },
});

