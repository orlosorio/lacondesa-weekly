import Link from "next/link";

type Props = {
  restaurantName: string;
};

/** Secondary reminder; primary claim CTA lives in the sticky sidebar. */
export function OwnerClaimBanner({ restaurantName }: Props) {
  return (
    <aside className="mt-14 lg:mt-16 border-t border-border pt-8 text-center">
      <p className="text-sm text-muted-foreground max-w-lg mx-auto">
        Do you manage {restaurantName}?{" "}
        <Link
          href="/contacto"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Claim the listing
        </Link>{" "}
        to update what readers see.
      </p>
    </aside>
  );
}
