import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const exercises = await prisma.exerciseType.findMany();

  if (!exercises) {
    return NextResponse.json("error getting exercises");
  }

  return NextResponse.json(exercises);
}
