// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
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
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.isAdmin;
        // ⚡ Forzamos hasPaid a boolean
        session.user.hasPaid = (user as any).hasPaid ?? false;
      }
      return session;
    },
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

// Exportamos las funciones HTTP directamente (App Router)
export async function GET(req: Request) {
  return NextAuth(authOptions)(req);
}

export async function POST(req: Request) {
  return NextAuth(authOptions)(req);
}
