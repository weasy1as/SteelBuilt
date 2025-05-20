import { prisma } from "@/prisma";
import { connect } from "http2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newWorkout = await prisma.workout.create({
      data: {
        date: new Date(data.date),
        comments: data.comments,
        workoutType: {
          connect: {
            id: data.workoutTypeId,
          },
        },
        user: { connect: { id: data.userId } }, // make sure you provide userId
        exercises: {
          create: data.exercises.map((e) => ({
            sets: e.sets,
            reps: e.reps,
            weight: e.weight,
            exerciseType: { connect: { id: e.exerciseTypeId } },
          })),
        },
      },
    });

    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    console.error("Error creating workout:", error);
    return NextResponse.json(
      { error: "Failed to create workout" },
      { status: 500 }
    );
  }
}
