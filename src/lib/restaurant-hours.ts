import type { DayCode, RestaurantHoursRow } from "@/types/restaurant";

const DAY_ORDER: DayCode[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SHORT_TO_CODE: Record<string, DayCode> = {
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
  Sun: "Sun",
};

/** Current calendar day in Mexico City as Mon–Sun code */
export function getCurrentDayCodeMexicoCity(): DayCode {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    weekday: "short",
  }).format(new Date());
  const key = weekday.slice(0, 3) as keyof typeof SHORT_TO_CODE;
  return SHORT_TO_CODE[key] ?? "Mon";
}

function parseHm(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + (m || 0);
}

/** Whether the venue is open right now (Mexico City time). */
export function isOpenNow(rows: RestaurantHoursRow[]): boolean {
  const day = getCurrentDayCodeMexicoCity();
  const row = rows.find((r) => r.day === day);
  if (!row || row.closed) return false;

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const now = hour * 60 + minute;
  const open = parseHm(row.open);
  const close = parseHm(row.close);
  if (close <= open) {
    return now >= open || now < close;
  }
  return now >= open && now < close;
}

export function sortHoursMonFirst(rows: RestaurantHoursRow[]): RestaurantHoursRow[] {
  const idx = (d: DayCode) => DAY_ORDER.indexOf(d);
  return [...rows].sort((a, b) => idx(a.day) - idx(b.day));
}

const DAY_LABEL: Record<DayCode, string> = {
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
  Sun: "Sun",
};

function formatTimeShort(hm: string): string {
  const [h, m] = hm.split(":").map(Number);
  const d = new Date();
  d.setHours(h ?? 0, m ?? 0, 0, 0);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Mexico_City",
  });
}

/**
 * One line for cards: “Open now” or next opening (Mexico City time).
 */
export function getSpotAvailabilityLine(rows: RestaurantHoursRow[]): string {
  if (isOpenNow(rows)) return "Open now";

  const nowDay = getCurrentDayCodeMexicoCity();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const nowMin = hour * 60 + minute;

  const sorted = sortHoursMonFirst(rows);
  const byDay = new Map(sorted.map((r) => [r.day, r]));

  for (let offset = 0; offset < 7; offset++) {
    const idx = (DAY_ORDER.indexOf(nowDay) + offset) % 7;
    const day = DAY_ORDER[idx]!;
    const row = byDay.get(day);
    if (!row || row.closed) continue;

    const open = parseHm(row.open);
    const close = parseHm(row.close);

    if (offset === 0) {
      if (nowMin < open) {
        return `Opens ${formatTimeShort(row.open)} today`;
      }
      if (close <= open) {
        if (nowMin < close) return "Open now";
      } else if (nowMin < close) {
        return "Open now";
      }
      continue;
    }

    return `Opens ${DAY_LABEL[day]} ${formatTimeShort(row.open)}`;
  }

  return "Hours vary";
}
