import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

// Importa el tipo de usuario generado por Prisma de esta forma:
type PrismaUser = Awaited<ReturnType<typeof prisma.user.findUnique>>;

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: any }) {
      // añadimos flags útiles a session
      if (session.user) {
        session.user.id = (user as any).id;
        session.user.isAdmin = (user as any).isAdmin;
        session.user.hasPaid = (user as any).hasPaid;
      }
      return session;
    },
    async signIn({ user }: { user: any }) {
      // si el email coincide con ADMIN_EMAIL, marca como admin y pago
      if (process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL) {
        await prisma.user.update({
          where: { id: user.id },
          data: { isAdmin: true, hasPaid: true }, // admin bypass
        });
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
