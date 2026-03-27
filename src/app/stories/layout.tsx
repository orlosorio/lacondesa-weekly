import { DM_Sans, Lora, Playfair_Display } from "next/font/google";
import "./stories.css";

const dmSans = DM_Sans({
  variable: "--font-stories-label",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-stories-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-stories-display",
  subsets: ["latin"],
  display: "swap",
});

export default function StoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang="en"
      className={`${dmSans.variable} ${lora.variable} ${playfair.variable} stories-editorial`}
    >
      {children}
    </div>
  );
}
