import { auth } from "@/auth";
import Card from "@/components/card";
import Goal from "@/components/goal";
import History from "@/components/history";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  const lastWorkoutData = {
    date: "2025-05-14",
    workoutType: "Strength",
    muscleGroups: ["Chest", "Triceps"],
    comments: "Felt great!",
  };

  const personalBestData = {
    exercise: "Bench Press",
    weight: 100,
    reps: 8,
  };

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/5">
        <Sidebar session={session} />
      </div>

      <div className="w-full md:w-4/5 flex flex-col gap-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card type="workout" data={lastWorkoutData} />
          <Card type="personalBest" data={personalBestData} />
          <Goal />
        </div>

        <div className="">
          <History />
        </div>
      </div>
    </div>
  );
}
