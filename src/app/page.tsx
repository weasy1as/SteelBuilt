import { auth, signOut } from "@/auth";
import Card from "@/components/card";
import Goal from "@/components/goal";
import History from "@/components/history";
import Sidebar from "@/components/sidebar";
import Image from "next/image";
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
    <div className="flex ">
      <div className="flex-1">
        <Sidebar session={session} />
      </div>
      <div className="flex flex-wrap flex-row sm:flex-col gap-5 items-center justify-between py-4 flex-5 bg-gray-300 h-screen w-full">
        <div className="flex flex-col md:flex-row justify-center px-4 sm-px-0 gap-2 w-full">
          <Card type="workout" data={lastWorkoutData} />
          <Card type="personalBest" data={personalBestData} />
          <Goal />
        </div>
        <div>
          <History />
        </div>
      </div>
    </div>
  );
}
