import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import axios from "axios";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  // check payment or admin
  const user = await prisma.user.findUnique({ where: { email: session.user.email }});
  if (!user?.hasPaid && !user?.isAdmin) return new Response("Payment required", { status: 402 });

  const body = await req.json();
  const { planId } = body;

  // create server in Hetzner
  const hetznerResp = await axios.post("https://api.hetzner.cloud/v1/servers", {
    name: `srv-${user.id}-${Date.now()}`,
    server_type: "cx42", // map from planId
    image: "ubuntu-22.04",
    ssh_keys: [], // opcional
  }, { headers: { Authorization: `Bearer ${process.env.HETZNER_TOKEN}` }});

  const hetznerId = hetznerResp.data.server.id;

  // save server in DB
  const created = await prisma.server.create({
    data: { userId: user.id, hetznerId, planId, state: "creating" }
  });

  // you can poll hetzner for readiness, for simplicity return created
  return new Response(JSON.stringify({ ok: true, server: created }));
}
