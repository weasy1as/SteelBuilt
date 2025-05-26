import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.exercise.findMany({
    where: {
      workout: {
        date: {
          gte: sevenDaysAgo,
          lte: now,
        },
      },
    },
    select: {
      exerciseType: {
        select: {
          muscleGroups: true,
        },
      },
    },
  });

  // Flatten muscle groups and count frequency
  const frequencyMap: Record<string, number> = {};

  data.forEach((exercise) => {
    exercise.exerciseType.muscleGroups.forEach((group) => {
      frequencyMap[group.name] = (frequencyMap[group.name] || 0) + 1;
    });
  });

  const result = Object.entries(frequencyMap).map(([muscleGroup, count]) => ({
    muscleGroup,
    count,
  }));

  return NextResponse.json(result);
}
