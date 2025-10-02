// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/Sidebar"; // Sidebar fijo
import Header from "@/components/Header";   // Header opcional con avatar

// Configuración de fuentes de Google
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        {/* Envuelve toda la app para usar NextAuth */}
        <SessionProvider>
          {/* Sidebar fijo a la izquierda */}
          <Sidebar />

          {/* Contenedor principal */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Header arriba con foto de usuario */}
            <Header />

            {/* Contenido principal */}
            <main className="flex-1 bg-gray-100 p-6">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
