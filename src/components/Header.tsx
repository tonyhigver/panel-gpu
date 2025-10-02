"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      {/* Logo / nombre de la app */}
      <div className="font-bold text-lg">GPU SaaS</div>

      {/* Área de sesión */}
      <div className="flex items-center gap-4">
        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Iniciar con Google
          </button>
        ) : (
          <>
            {/* Email del usuario */}
            <div className="text-sm">{session.user?.email}</div>

            {/* Avatar */}
            <Image
              src={session.user?.image || "/default.png"} // Asegúrate de tener public/default.png
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />

            {/* Botón de logout */}
            <button
              onClick={() => signOut()}
              className="px-3 py-1 border rounded hover:bg-gray-100 transition"
            >
              Salir
            </button>
          </>
        )}
      </div>
    </header>
  );
}
