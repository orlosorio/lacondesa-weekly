import { type SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { testimonial } from "./testimonial";
import { archiveIssue } from "./archiveIssue";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, testimonial, archiveIssue, siteSettings],
};
