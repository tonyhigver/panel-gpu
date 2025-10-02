// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // ✅ Default export
import type { Session, User } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Tipado de session: agregamos id, isAdmin y hasPaid a session.user
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.isAdmin;
        session.user.hasPaid = (user as any).hasPaid ?? false; // ✅ Aseguramos que existe
      }
      return session;
    },

    // Tipado de signIn: si coincide el ADMIN_EMAIL, marcamos como admin y con pago
    async signIn({ user }: { user: User }) {
      if (process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL) {
        await prisma.user.update({
          where: { id: user.id },
          data: { isAdmin: true, hasPaid: true },
        });
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Export default handler compatible con App Router
const handler = NextAuth(authOptions);
export default handler;
