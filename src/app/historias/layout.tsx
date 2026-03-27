import { Lora } from "next/font/google";
import "./editorial.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-historias-body",
  display: "swap",
});

export default function HistoriasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang="es"
      className={`historias-editorial ${lora.variable} min-h-screen pt-16 lg:pt-20`}
    >
      {children}
    </div>
  );
}
