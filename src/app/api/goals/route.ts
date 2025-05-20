import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const data = await req.json();

  const result = await prisma.goal.create({
    data: {
      ...data,
      userId: session.user?.id,
      targetDate: data.targetDate ? new Date(data.targetDate) : null,
    },
  });

  return NextResponse.json(result);
}
