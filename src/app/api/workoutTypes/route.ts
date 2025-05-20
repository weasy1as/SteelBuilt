import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const workoutType = await prisma.workoutType.findMany();
  return NextResponse.json(workoutType);
}
