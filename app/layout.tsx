import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reviews UP",
  description: "Gestion IA des avis Google et campagnes WhatsApp pour Voyages 21"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
