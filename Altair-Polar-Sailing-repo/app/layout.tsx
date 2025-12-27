import type { Metadata } from "next";
import "./globals.css";
import { serif, sans } from "./fonts";
import Background from "@/components/Background";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Altair — Antártica, en privado",
  description: "Charter boutique del schooner Altair. Antártica en calma, máximo 6 huéspedes."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${serif.variable} ${sans.variable} antialiased`}>
        <Background />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
