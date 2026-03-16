import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "subscriberCount",
      title: "Subscriber Count Text",
      type: "string",
      description: 'e.g. "2,000+"',
    }),
    defineField({
      name: "openRate",
      title: "Open Rate",
      type: "string",
      description: 'e.g. "52%"',
    }),
    defineField({
      name: "localReaders",
      title: "Local Readers Percentage",
      type: "string",
      description: 'e.g. "85%"',
    }),
    defineField({
      name: "clickRate",
      title: "Click Rate",
      type: "string",
      description: 'e.g. "28%"',
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
    }),
    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
