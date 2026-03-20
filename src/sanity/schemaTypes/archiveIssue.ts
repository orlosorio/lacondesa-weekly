import { defineField, defineType } from "sanity";

export const archiveIssue = defineType({
  name: "archiveIssue",
  title: "Archive Issue",
  type: "document",
  liveEdit: true,
  fields: [
    defineField({
      name: "number",
      title: "Issue Number",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publish Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => `issue-${doc.number}`,
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Issue Number, Desc",
      name: "numberDesc",
      by: [{ field: "number", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      number: "number",
      date: "date",
    },
    prepare({ title, number, date }) {
      return {
        title: `#${number}: ${title}`,
        subtitle: date,
      };
    },
  },
});
