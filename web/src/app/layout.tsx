
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aysén Documental | Archivo Histórico de la Patagonia",
  description: "Explora la identidad de la Región de Aysén a través de su archivo audiovisual. Documentales, cine y relatos históricos de la Patagonia Chilena.",
  openGraph: {
    title: "Aysén Documental | Cine y Memoria Patagona",
    description: "La plataforma de streaming del patrimonio audiovisual de Aysén.",
    url: "https://aysendocumental.cl",
    siteName: "Aysén Documental",
    images: [
      {
        url: "/og-image.jpg", // Asegurarse de tener esto o usar una externa
        width: 1200,
        height: 630,
        alt: "Paisaje de Aysén Cine",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-max-black text-white`}>
        <Navbar />
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
