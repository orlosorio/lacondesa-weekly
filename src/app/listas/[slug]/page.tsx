import { permanentRedirect } from "next/navigation";

export default async function LegacyListPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/lists/${encodeURIComponent(slug)}`);
}
