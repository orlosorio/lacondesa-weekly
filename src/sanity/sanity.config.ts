import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./schemaTypes";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Sanity Studio config (lives under `src/` so imports resolve reliably when
 * Next bundles `next-sanity` / `NextStudio` — root `@/` aliases can fail for
 * configs outside `src/` in some setups).
 */
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("article").title("Journal — stories & reviews"),
            S.documentTypeListItem("listicle").title("Lists & guides"),
            S.documentTypeListItem("historia").title("People — interviews"),
            S.documentTypeListItem("teamMember").title("Authors & team"),
            S.listItem()
              .title("Additional content")
              .child(S.list().title("Additional content").items([
                S.documentTypeListItem("restaurant").title("Place directory"),
                S.documentTypeListItem("newOpening").title("New openings"),
                S.documentTypeListItem("archiveIssue").title("Newsletter archive"),
                S.documentTypeListItem("testimonial").title("Testimonials"),
                S.documentTypeListItem("wallOfLoveRestaurant").title("Community places"),
                S.documentTypeListItem("wallOfLoveVote").title("Community votes"),
              ])),
            S.divider(),
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
