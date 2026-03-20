import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  liveEdit: true,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One-line description shown under the name.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Brief description for accessibility",
        }),
      ],
    }),
    defineField({
      name: "fullBio",
      title: "Full Bio",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Full editorial bio. 3-6 paragraphs. This is your primary EEAT signal — be specific about experience, background, and expertise.",
    }),
    defineField({
      name: "expertise",
      title: "Areas of Expertise",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Bars & Nightlife",
          "Coffee",
          "Restaurants",
          "Food History",
          "Architecture",
          "Urban Culture",
          "Music",
          "Art & Design",
          "Barbershops & Grooming",
          "Retail & Shops",
          "Parks & Outdoors",
          "Local History",
          "Photography",
          "Interviews",
        ],
      },
    }),
    defineField({
      name: "credentials",
      title: "Credentials & Background",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "credential",
              title: "Credential",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "authorStatement",
      title: "Author Statement",
      type: "text",
      rows: 4,
      description:
        "Optional. A personal note about their relationship with La Condesa or their editorial philosophy.",
    }),
    defineField({
      name: "yearsActive",
      title: "Covering La Condesa Since (year)",
      type: "number",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter / X",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn",
      type: "url",
    }),
    defineField({
      name: "personalWebsite",
      title: "Personal Website",
      type: "url",
    }),
    defineField({
      name: "featuredWork",
      title: "Featured Work",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "listicle" }, { type: "article" }],
        },
      ],
      description:
        "Manually curate up to 6 pieces that best represent this author.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Leave empty to use creation order.",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Only active members are shown on the Equipo page.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
