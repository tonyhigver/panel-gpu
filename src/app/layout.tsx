import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar"; // 👈 Asegúrate de tener este archivo creado

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GPU Control Panel",
  description: "Servidor Hetzner + GPU dinámicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
        {/* ✅ Sidebar fijo */}
        <Sidebar />

        {/* ✅ Contenido principal */}
        <main className="flex-1 bg-gray-100 min-h-screen p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
