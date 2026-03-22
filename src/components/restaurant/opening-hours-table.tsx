import type { RestaurantHoursRow } from "@/types/restaurant";
import { getCurrentDayCodeMexicoCity, sortHoursMonFirst } from "@/lib/restaurant-hours";

const DAY_LABEL: Record<string, string> = {
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
  Sun: "Sun",
};

type Props = {
  hours: RestaurantHoursRow[];
};

export function OpeningHoursTable({ hours }: Props) {
  const sorted = sortHoursMonFirst(hours);
  const today = getCurrentDayCodeMexicoCity();

  return (
    <div>
      <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
        Hours
      </h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="py-2 pr-2 font-medium">Day</th>
            <th className="py-2 pr-2 font-medium">Opens</th>
            <th className="py-2 font-medium">Closes</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const isToday = row.day === today;
            return (
              <tr
                key={row.day}
                className={
                  isToday
                    ? "bg-primary/5 text-foreground font-medium border-l-2 border-primary"
                    : "text-muted-foreground"
                }
              >
                <td className="py-2 pr-2">{DAY_LABEL[row.day]}</td>
                <td className="py-2 pr-2 tabular-nums">
                  {row.closed ? "—" : row.open}
                </td>
                <td className="py-2 tabular-nums">
                  {row.closed ? "Closed" : row.close}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
