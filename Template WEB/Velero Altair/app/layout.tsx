import type { Metadata } from "next";
import "./globals.css";
import { serif, sans } from "./fonts";
import Background from "@/components/Background";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Altair � Ant�rtica, en privado",
  description: "Charter boutique del schooner Altair. Ant�rtica en calma, m�ximo 6 hu�spedes."
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
