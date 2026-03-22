export function formatWebsiteDisplay(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function formatPriceMxn(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(amount);
}
