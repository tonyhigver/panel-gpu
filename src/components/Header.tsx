"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

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
            <Image
              src={session.user?.image || "/default.png"} // Pon una imagen por defecto en public/default.png
              alt="avatar"
              width={40}   // ancho en px
              height={40}  // alto en px
              className="rounded-full"
            />
            <button onClick={() => signOut()} className="ml-2">Salir</button>
          </>
        )}
      </div>
    </header>
  );
}
