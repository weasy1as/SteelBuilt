import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const muscleGroups = await prisma.muscleGroup.findMany();
  return NextResponse.json(muscleGroups);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  await prisma.muscleGroup.create({
    data: {
      name,
    },
  });
  return NextResponse.json({ message: "Muscle group added" }, { status: 201 });
}
