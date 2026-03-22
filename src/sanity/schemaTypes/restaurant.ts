import { defineField, defineType } from "sanity";

const DAY_OPTIONS = [
  { title: "Mon", value: "Mon" },
  { title: "Tue", value: "Tue" },
  { title: "Wed", value: "Wed" },
  { title: "Thu", value: "Thu" },
  { title: "Fri", value: "Fri" },
  { title: "Sat", value: "Sat" },
  { title: "Sun", value: "Sun" },
];

export const restaurant = defineType({
  name: "restaurant",
  title: "Restaurant profile",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "location", title: "Address & map" },
    { name: "contact", title: "Contact & links" },
    { name: "hours", title: "Hours" },
    { name: "content", title: "Story, menu & photos" },
    { name: "reviews", title: "Reviews" },
  ],
  fields: [
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description: "When off, this place won’t appear on the public site.",
      initialValue: true,
      group: "basics",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
      group: "basics",
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      description: "Lowercase, no spaces. Used in /spots/[neighborhood]/[this-slug].",
      validation: (rule) => rule.required(),
      group: "basics",
    }),
    defineField({
      name: "neighborhoodName",
      title: "Neighborhood (display)",
      type: "string",
      description: 'e.g. "Condesa", "Roma Norte"',
      validation: (rule) => rule.required(),
      group: "basics",
    }),
    defineField({
      name: "neighborhoodSlug",
      title: "Neighborhood slug",
      type: "string",
      description: 'URL segment: lowercase, hyphens. e.g. "condesa", "roma-norte"',
      validation: (rule) => rule.required().lowercase(),
      group: "basics",
    }),
    defineField({
      name: "category",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
      group: "basics",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 10,
      description: "Editorial text. Use blank lines between paragraphs.",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "features",
      title: "Highlights / features",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "street",
      title: "Street address",
      type: "string",
      validation: (rule) => rule.required(),
      group: "location",
    }),
    defineField({
      name: "colonia",
      title: "Colonia",
      type: "string",
      validation: (rule) => rule.required(),
      group: "location",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      initialValue: "Mexico City",
      group: "location",
    }),
    defineField({
      name: "postalCode",
      title: "Postal code",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      validation: (rule) => rule.required().min(-90).max(90),
      group: "location",
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      validation: (rule) => rule.required().min(-180).max(180),
      group: "location",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "googleMaps",
      title: "Google Maps URL (optional)",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              type: "string",
              options: { list: DAY_OPTIONS },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "open",
              title: "Opens (24h)",
              type: "string",
              description: 'e.g. "09:00"',
            }),
            defineField({
              name: "close",
              title: "Closes (24h)",
              type: "string",
            }),
            defineField({
              name: "closed",
              title: "Closed this day",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { day: "day", closed: "closed", open: "open", close: "close" },
            prepare({ day, closed, open, close }) {
              return {
                title: day,
                subtitle: closed ? "Closed" : `${open ?? "—"} – ${close ?? "—"}`,
              };
            },
          },
        },
      ],
      group: "hours",
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "isCover",
              title: "Cover image",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { alt: "alt", media: "image", isCover: "isCover" },
            prepare({ alt, media, isCover }) {
              return { title: alt || "Photo", subtitle: isCover ? "Cover" : undefined, media };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1),
      group: "content",
    }),
    defineField({
      name: "menu",
      title: "Menu (optional)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Category name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 2,
                    }),
                    defineField({
                      name: "price",
                      title: "Price (MXN)",
                      type: "number",
                    }),
                  ],
                  preview: {
                    select: { title: "name", price: "price" },
                    prepare({ title, price }) {
                      return { title, subtitle: price != null ? `$${price} MXN` : undefined };
                    },
                  },
                },
              ],
            }),
          ],
        },
      ],
      group: "content",
    }),
    defineField({
      name: "ratingAverage",
      title: "Average rating (optional)",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
      group: "reviews",
    }),
    defineField({
      name: "ratingCount",
      title: "Review count (optional)",
      type: "number",
      validation: (rule) => rule.min(0).integer(),
      group: "reviews",
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "author",
              title: "Author (e.g. Jane D.)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "rating",
              title: "Stars (1–5)",
              type: "number",
              validation: (rule) => rule.required().min(1).max(5),
            }),
            defineField({
              name: "date",
              title: "Date",
              type: "date",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Review text",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      group: "reviews",
    }),
    defineField({
      name: "claimed",
      title: "Listing claimed by owner",
      type: "boolean",
      initialValue: false,
      group: "basics",
    }),
  ],
  preview: {
    select: {
      title: "name",
      n: "neighborhoodName",
      media: "images.0.image",
    },
    prepare({ title, n, media }) {
      return { title, subtitle: n, media };
    },
  },
});
