import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";
import { resolveSanityWriteToken } from "./resolve-write-token";

/**
 * Server-only client with write access. Requires SANITY_API_WRITE_TOKEN or SANITY_WRITE_TOKEN.
 */
export function getSanityWriteClient(): SanityClient {
  const token = resolveSanityWriteToken();
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN (set SANITY_WRITE_TOKEN or SANITY_API_TOKEN with Editor access as fallback) for write operations."
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
