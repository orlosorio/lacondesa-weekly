"use client";

import { usePathname } from "next/navigation";
import { HomeNavigation } from "@/components/home-navigation";

export function Navigation() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;
  return <HomeNavigation key={pathname} pathname={pathname} />;
}
