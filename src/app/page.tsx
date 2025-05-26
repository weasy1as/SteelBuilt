import { auth } from "@/auth";
import { prisma } from "@/prisma";
import Card from "@/components/card";
import Goal from "@/components/goal";
import History from "@/components/history";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";
import MuscleGroupChart from "@/components/MuscleGroupChart";

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
  const personalBestData = await prisma.personalBest.findMany({
    where: { userId: session.user?.id },
    orderBy: { id: "desc" }, // Or by exercise name if preferred
    select: {
      exercise: true,
      weight: true,
      reps: true,
    },
  });

  // ✅ Fetch current goal
  const goals = await prisma.goal.findMany({
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
    <div className="flex pb-6 flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full">
        <Sidebar session={session} />
      </div>

      <div className="w-full md:w-4/5 flex flex-col gap-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lastWorkoutData && <Card type="workout" data={lastWorkoutData} />}
          <Card type="personalBest" data={personalBestData} />
          <Goal goals={goals} />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <MuscleGroupChart />
          <History history={history} />
        </div>
      </div>
    </div>
  );
}
