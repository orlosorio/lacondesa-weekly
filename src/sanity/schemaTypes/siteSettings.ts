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
      group: "audience",
    }),
    defineField({
      name: "openRate",
      title: "Open Rate",
      type: "string",
      description: 'e.g. "52%"',
      group: "audience",
    }),
    defineField({
      name: "localReaders",
      title: "Local Readers Percentage",
      type: "string",
      description: 'e.g. "85%"',
      group: "audience",
    }),
    defineField({
      name: "clickRate",
      title: "Click Rate",
      type: "string",
      description: 'e.g. "28%"',
      group: "audience",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "audience",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
      group: "audience",
    }),
    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      type: "image",
      options: { hotspot: true },
      group: "audience",
    }),
    // SEO & branding (default metadata and favicon)
    defineField({
      name: "siteTitle",
      title: "Title tag (home page)",
      type: "string",
      description: "The <title> shown in the browser tab and used as default for the home page (e.g. La Condesa Weekly)",
      group: "seo",
    }),
    defineField({
      name: "titleTemplate",
      title: "Title template for other pages",
      type: "string",
      description: 'How other page titles are formatted, e.g. "%s | La Condesa Weekly" (%s = page name)',
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description (home page)",
      type: "text",
      rows: 3,
      description: "Default meta description for the home page (search results and social sharing)",
      group: "seo",
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      description: "Override for social share title (leave blank to use Site Title)",
      group: "seo",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      rows: 2,
      description: "Override for social share description",
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      description: "Image shown when sharing the site on social (recommended 1200×630)",
      group: "seo",
    }),
    defineField({
      name: "favicon",
      title: "Favicon (browser tab icon)",
      type: "image",
      description: "Icon shown in the browser tab. Use a square image (e.g. 32×32 or 64×64).",
      group: "seo",
    }),
    defineField({
      name: "twitterCard",
      title: "Twitter Card Type",
      type: "string",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary large image", value: "summary_large_image" },
        ],
      },
      description: "Card style for Twitter/social",
      group: "seo",
    }),
  ],
  groups: [
    { name: "seo", title: "SEO & branding (title, description, favicon)", default: true },
    { name: "audience", title: "Audience & stats" },
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
