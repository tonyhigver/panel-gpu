// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // ✅ Usamos default export
import type { Session, User } from "next-auth"; // Tipos extendidos

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Callback session tipado
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.isAdmin;
        session.user.hasPaid = user.hasPaid; // ✅ Ahora existe en Prisma
      }
      return session;
    },

    // Callback signIn tipado
    async signIn({ user }: { user: User }) {
      // Si el email coincide con ADMIN_EMAIL, marcar como admin y con pago
      if (process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL) {
        await prisma.user.update({
          where: { id: user.id },
          data: { isAdmin: true, hasPaid: true }, // ✅ Campo agregado
        });
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
