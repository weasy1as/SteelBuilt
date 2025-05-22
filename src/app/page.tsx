import { auth } from "@/auth";
import { prisma } from "@/prisma";
import Card from "@/components/card";
import Goal from "@/components/goal";
import History from "@/components/history";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Fetch latest workout from DB for logged in user
  const lastWorkout = await prisma.workout.findFirst({
    where: { userId: session.user?.id },
    orderBy: { date: "desc" },
    include: {
      workoutType: true,
      exercises: {
        include: {
          exerciseType: { include: { muscleGroups: true } },
        },
      },
    },
  });

  const muscleGroupsSet = new Set<string>();

  lastWorkout?.exercises.forEach((exercise) => {
    exercise.exerciseType.muscleGroups.forEach((mg) => {
      muscleGroupsSet.add(mg.name);
    });
  });

  const muscleGroups = Array.from(muscleGroupsSet);

  // Prepare data for Card, transform as needed
  const lastWorkoutData = lastWorkout
    ? {
        date: lastWorkout.date.toISOString().split("T")[0],
        workoutType: lastWorkout.workoutType?.name || "N/A",
        muscleGroups,
        comments: lastWorkout.comments || "",
      }
    : null;

  // ✅ Fetch personal best
  const personalBest = await prisma.personalBest.findFirst({
    where: { userId: session.user?.id },
    orderBy: { id: "desc" }, // or by updatedAt if needed
  });

  const personalBestData = personalBest
    ? {
        exercise: personalBest.exercise,
        weight: personalBest.weight,
        reps: personalBest.reps,
      }
    : null;

  // ✅ Fetch current goal
  const goal = await prisma.goal.findFirst({
    where: { userId: session.user?.id },
    orderBy: { updatedAt: "desc" },
  });

  const history = await prisma.workout.findMany({
    where: { userId: session.user?.id },
    orderBy: { date: "desc" },
    take: 10,
    select: {
      id: true,
      date: true,
      workoutType: { select: { name: true } },
      exercises: true,
    },
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full">
        <Sidebar session={session} />
      </div>

      <div className="w-full md:w-4/5 flex flex-col gap-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lastWorkoutData && <Card type="workout" data={lastWorkoutData} />}
          <Card type="personalBest" data={personalBestData} />
          <Goal goal={goal} />
        </div>

        <div>
          <History history={history} />
        </div>
      </div>
    </div>
  );
}
