// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Evita crear múltiples instancias en desarrollo
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  // @ts-ignore
  prisma = global.prisma;
}

export default prisma;
