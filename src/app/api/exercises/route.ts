import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const exercises = await prisma.exercise.findMany({
    select: { name: true },
    distinct: ["name"],
  });
  return NextResponse.json(exercises.map((ex) => ex.name));
}

export async function POST(req: Request) {
  const { name } = await req.json();
  await prisma.exercise.create({
    data: {
      name,
    },
  });
  return NextResponse.json({ message: "Exercise added" }, { status: 201 });
}
