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
            S.documentTypeListItem("article").title("Articles"),
            S.documentTypeListItem("historia").title("Stories (La Condesa)"),
            S.documentTypeListItem("restaurant").title("Restaurant profiles"),
            S.documentTypeListItem("newOpening").title("New Openings"),
            S.documentTypeListItem("archiveIssue").title("Archive Issues"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("teamMember").title("Team"),
            S.documentTypeListItem("listicle").title("Listicles"),
            S.listItem()
              .title("Wall of Love — Pending")
              .child(
                S.documentList()
                  .title("Pending restaurant submissions")
                  .filter(
                    '_type == "wallOfLoveRestaurant" && approved == false'
                  )
                  .defaultOrdering([
                    { field: "submittedAt", direction: "desc" },
                  ])
              ),
            S.documentTypeListItem("wallOfLoveRestaurant").title(
              "Wall of Love — Restaurants"
            ),
            S.documentTypeListItem("wallOfLoveVote").title("Wall of Love — Votes"),
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
