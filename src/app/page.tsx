"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Plan = {
  id: string;
  title: string;
  cpu: string;
  ram: string;
  gpu: string;
  price: number;
};

export default function PlanesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ Si no está logueado → lo mandamos al login (página inicial)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // replace evita que vuelva atrás con el botón del navegador
    }
  }, [status, router]);

  // ✅ Mientras se valida la sesión → cargando
  if (status === "loading") {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  // ✅ Planes estáticos (luego los conectaremos a la BD si quieres)
  const planes: Plan[] = [
    { id: "cx32-rtx3080", title: "CX32 + RTX 3080", cpu: "8 vCPU", ram: "32GB", gpu: "RTX 3080", price: 50 },
    { id: "cx42-rtx4080", title: "CX42 + RTX 4080", cpu: "16 vCPU", ram: "64GB", gpu: "RTX 4080", price: 99 },
    { id: "cx64-rtx4090", title: "CX64 + RTX 4090", cpu: "32 vCPU", ram: "128GB", gpu: "RTX 4090", price: 199 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">🖥️ Catálogo de Planes</h1>
      <p className="text-gray-600">Elige el plan de servidor que mejor se adapte a tus necesidades.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planes.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">{plan.title}</h2>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>CPU: {plan.cpu}</li>
                <li>RAM: {plan.ram}</li>
                <li>GPU: {plan.gpu}</li>
              </ul>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <span className="text-xl font-bold">${plan.price}</span>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                onClick={() => alert(`Seleccionaste el plan ${plan.title}`)}
              >
                Elegir Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
