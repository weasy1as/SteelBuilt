import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userId = session.user?.id;
  const lastWorkout = await prisma.workout.findFirst({
    where: {
      userId: userId, // filter by user if needed
    },
    orderBy: {
      date: "desc", // sort by date descending to get latest workout first
    },
    include: {
      exercises: true, // include related data if needed
      workoutType: true,
    },
  });

  if (!lastWorkout) {
    return NextResponse.json("error getting exercises");
  }

  return NextResponse.json(lastWorkout);
}
