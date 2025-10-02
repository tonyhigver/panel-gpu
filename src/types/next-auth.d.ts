// src/types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isAdmin: boolean;
      hasPaid: boolean;
    } & DefaultSession["user"]; // mantiene name, email, image
  }

  interface User {
    id: string;
    isAdmin: boolean;
    hasPaid: boolean;
  }
}
