import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Insertamos planes de ejemplo
  await prisma.plan.createMany({
    data: [
      {
        id: "cx32-rtx3080",
        name: "CX32 + RTX 3080",
        price: 50,
        cpu: "8 vCPU",
        ram: "32GB",
        gpu: "RTX 3080",
      },
      {
        id: "cx42-rtx4080",
        name: "CX42 + RTX 4080",
        price: 99,
        cpu: "16 vCPU",
        ram: "64GB",
        gpu: "RTX 4080",
      },
    ],
  });

  // Insertamos un usuario de prueba
  const testUser = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      id: "test",
      name: "Usuario Test",
      email: "test@example.com",
      isAdmin: false,
    },
  });

  // Insertamos servidores de prueba asociados al usuario y planes
  await prisma.server.createMany({
    data: [
      {
        id: "srv1",
        planId: "cx32-rtx3080",
        userId: testUser.id,
        state: "available",
      },
      {
        id: "srv2",
        planId: "cx42-rtx4080",
        userId: testUser.id,
        state: "available",
      },
    ],
  });

  console.log("Planes y servidores insertados correctamente");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
