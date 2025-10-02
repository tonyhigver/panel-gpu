import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export default async function PlanesPage() {
  // ✅ Verificar si el usuario tiene sesión
  const session = await getServerSession(authOptions);
  if (!session) redirect("/"); // o "/login" si tienes login propio

  // ✅ Obtener los planes de la base de datos
  const planes = await prisma.plan.findMany();

  return (
    <div>
      <h1>Planes disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {planes.map((plan) => (
          <div key={plan.id} className="p-4 bg-white shadow rounded">
            <h2 className="font-bold">{plan.name}</h2>
            <p>CPU: {plan.cpu}</p>
            <p>RAM: {plan.ram}</p>
            <p>GPU: {plan.gpu}</p>
            <p className="font-bold">{plan.price}€/mes</p>
            <button className="bg-blue-600 text-white px-3 py-1 rounded">
              Elegir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
