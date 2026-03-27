import { defineField, defineType } from "sanity";

export const historia = defineType({
  name: "historia",
  title: "Story",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Resident", value: "resident" },
          { title: "Business", value: "business" },
          { title: "Artist", value: "artist" },
          { title: "Project", value: "project" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description:
        "One-liner shown on the profile card. Keep it under 120 characters.",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "heroPhoto",
      title: "Hero Photo",
      description: "Main portrait. Use a high-quality vertical photo.",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Profile Summary",
      description:
        "Editorial intro paragraph. 3–5 sentences. This is the hook before the interview.",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metadata",
      title: "Profile Metadata",
      description: "Displayed as a byline under the summary.",
      type: "object",
      fields: [
        defineField({
          name: "neighborhood",
          title: "Neighborhood",
          type: "string",
        }),
        defineField({
          name: "profession",
          title: "Profession",
          type: "string",
        }),
        defineField({
          name: "yearsInCondesa",
          title: "Years in La Condesa",
          type: "number",
          description: "Use whole years (e.g. 6) or leave empty.",
        }),
      ],
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      description:
        "The single most powerful quote from the interview. Displayed large.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "interview",
      title: "Interview",
      description: "Full Q&A. Add one block per question–answer pair.",
      type: "array",
      of: [
        {
          type: "object",
          name: "qaPair",
          title: "Q&A",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 6,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
    defineField({
      name: "secondaryPhotos",
      title: "Secondary Photos",
      description: "Optional. Max 4 additional photos shown in the photo strip.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description:
        "Featured stories appear first and can use full-width treatment on the collection page.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "heroPhoto",
    },
  },
  orderings: [
    {
      title: "Publication Date, Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
