import { defineField, defineType } from "sanity";

const blockContent = {
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
    { title: "Quote", value: "blockquote" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
    ],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [{ name: "href", type: "url", title: "URL" }],
      },
    ],
  },
};

export const listicle = defineType({
  name: "listicle",
  title: "Listicle",
  type: "document",
  liveEdit: true,
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Bars", value: "Bars" },
          { title: "Coffee Shops", value: "Coffee Shops" },
          { title: "Restaurants", value: "Restaurants" },
          { title: "Barbershops", value: "Barbershops" },
          { title: "Shops", value: "Shops" },
          { title: "Parks", value: "Parks" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "summary",
      title: "Editorial Summary",
      type: "array",
      of: [blockContent],
      description: "Intro block: why this list matters.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "entries",
      title: "List Entries",
      type: "array",
      of: [
        {
          type: "object",
          name: "listicleEntry",
          fields: [
            defineField({
              name: "name",
              title: "Place Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "tagline",
              title: "Tagline / Category Tag",
              type: "string",
              description: "e.g. Mezcalería · Roma Norte",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alt text", type: "string" }),
              ],
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "array",
              of: [blockContent],
            }),
            defineField({
              name: "pullQuote",
              title: "Pull Quote (optional)",
              type: "string",
            }),
            defineField({
              name: "address",
              title: "Address",
              type: "string",
            }),
            defineField({
              name: "hours",
              title: "Hours",
              type: "string",
            }),
            defineField({
              name: "priceRange",
              title: "Price Range",
              type: "string",
              options: {
                list: [
                  { title: "$", value: "$" },
                  { title: "$$", value: "$$" },
                  { title: "$$$", value: "$$$" },
                  { title: "$$$$", value: "$$$$" },
                ],
              },
            }),
            defineField({
              name: "externalUrl",
              title: "External Link (optional)",
              type: "url",
            }),
            defineField({
              name: "externalLinkLabel",
              title: "Link Label",
              type: "string",
              description: "e.g. View on map",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "tagline", media: "photo" },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Published, New",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "heroImage" },
  },
});
