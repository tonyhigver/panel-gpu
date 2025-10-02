// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // ✅ default export
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
    // Tipado de session
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.isAdmin;
        session.user.hasPaid = user.hasPaid; // ✅ Ahora sí existe en Prisma
      }
      return session;
    },

    // Tipado de signIn
    async signIn({ user }: { user: User }) {
      // Marcar admin y pago si coincide el email
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

// Export default handler para Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
