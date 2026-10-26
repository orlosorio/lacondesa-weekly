"use client";

import { usePathname } from "next/navigation";
import { HomeNavigation } from "@/components/home-navigation";

export function Navigation() {
  const pathname = usePathname();
  return <HomeNavigation key={pathname} pathname={pathname} />;
}
