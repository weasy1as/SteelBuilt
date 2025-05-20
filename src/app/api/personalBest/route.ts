import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const data = await req.json();

  const result = await prisma.personalBest.create({
    data: {
      ...data,
      userId: session.user?.id,
    },
  });

  return NextResponse.json(result);
}
