"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="font-bold">GPU SaaS</div>
      <div className="flex items-center gap-4">
        {!session ? (
          <button onClick={() => signIn("google")} className="btn">Iniciar con Google</button>
        ) : (
          <>
            <div className="text-sm">{session.user?.email}</div>
            <img src={session.user?.image || ""} alt="avatar" className="w-10 h-10 rounded-full"/>
            <button onClick={() => signOut()} className="ml-2">Salir</button>
          </>
        )}
      </div>
    </header>
  );
}
