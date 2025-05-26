import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const exercises = await prisma.exercise.findMany({
    select: {
      exerciseType: {
        select: {
          name: true,
        },
      },
    },
    distinct: ["exerciseTypeId"],
  });
  return NextResponse.json(exercises.map((ex) => ex.exerciseType));
}

export async function POST(req: Request) {
  const { name } = await req.json();
  await prisma.exerciseType.create({
    data: {
      name,
    },
  });
  return NextResponse.json({ message: "Exercise added" }, { status: 201 });
}
