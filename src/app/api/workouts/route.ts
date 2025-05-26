import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export interface Exercise {
  id: string;
  workoutId: string;
  exerciseTypeId: string;
  sets: number;
  reps: number;
  weight: number;
  createdAt: string; // or Date if using JS Date objects
  updatedAt: string;
}

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
        user: { connect: { id: data.userId } },
        exercises: {
          create: data.exercises.map((e: Exercise) => ({
            sets: e.sets,
            reps: e.reps,
            weight: e.weight,
            exerciseType: { connect: { id: e.exerciseTypeId } },
          })),
        },
      },
      include: {
        exercises: {
          include: {
            exerciseType: true,
          },
        },
      },
    });

    const newPersonalBests: {
      exercise: string;
      weight: number;
      reps: number;
    }[] = [];

    for (const exercise of newWorkout.exercises) {
      const exerciseName = exercise.exerciseType.name;

      const existingPB = await prisma.personalBest.findFirst({
        where: {
          userId: data.userId,
          exercise: exerciseName,
        },
      });

      const isNewPB =
        !existingPB ||
        exercise.weight > existingPB.weight ||
        (exercise.weight === existingPB.weight &&
          exercise.reps > existingPB.reps);

      if (isNewPB) {
        await prisma.personalBest.upsert({
          where: {
            userId_exercise: {
              userId: data.userId,
              exercise: exerciseName,
            },
          },
          update: {
            weight: exercise.weight,
            reps: exercise.reps,
          },
          create: {
            userId: data.userId,
            exercise: exerciseName,
            weight: exercise.weight,
            reps: exercise.reps,
          },
        });
        newPersonalBests.push({
          exercise: exerciseName,
          weight: exercise.weight,
          reps: exercise.reps,
        });
      }
    }

    return NextResponse.json(
      {
        workout: newWorkout,
        newPersonalBests,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating workout:", error);
    return NextResponse.json(
      { error: "Failed to create workout" },
      { status: 500 }
    );
  }
}
