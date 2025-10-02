// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Evita crear múltiples instancias de Prisma en desarrollo
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Creamos la instancia de Prisma, logueando solo en desarrollo
const prisma =
  global.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : [],
  });

// Guardamos la instancia en global para que no se duplique en desarrollo
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma; // ✅ Export default para que funcione el import en tus route.ts
