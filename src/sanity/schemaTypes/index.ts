import { type SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { testimonial } from "./testimonial";
import { archiveIssue } from "./archiveIssue";
import { siteSettings } from "./siteSettings";
import { newOpening } from "./newOpening";
import { teamMember } from "./teamMember";
import { listicle } from "./listicle";
import { restaurant } from "./restaurant";
import { historia } from "./historia";
import { wallOfLoveRestaurant } from "./wallOfLoveRestaurant";
import { wallOfLoveVote } from "./wallOfLoveVote";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    article,
    testimonial,
    archiveIssue,
    siteSettings,
    newOpening,
    teamMember,
    listicle,
    restaurant,
    historia,
    wallOfLoveRestaurant,
    wallOfLoveVote,
  ],
};
