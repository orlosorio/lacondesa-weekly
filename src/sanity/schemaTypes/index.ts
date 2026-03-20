import { type SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { testimonial } from "./testimonial";
import { archiveIssue } from "./archiveIssue";
import { siteSettings } from "./siteSettings";
import { newOpening } from "./newOpening";
import { teamMember } from "./teamMember";
import { listicle } from "./listicle";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, testimonial, archiveIssue, siteSettings, newOpening, teamMember, listicle],
};
