import { auth } from "@/auth";

import Sidebar from "@/components/sidebar";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import React from "react";

export default async function PersonalBestPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session?.user?.id) {
    // Optionally redirect or show a message
    return <p>Please sign in to view your personal bests.</p>;
  }

  const personalBests = await prisma.personalBest.findMany({
    where: { userId: session.user.id },
    orderBy: { exercise: "asc" },
  });

  return (
    <div className="">
      <Sidebar session={session} />
      <main className="p-6 w-full bg-gradient-to-b from-gray-900 to-black h-screen">
        <h1 className="text-white text-2xl font-bold mb-4">
          🏆 Personal Bests
        </h1>
        {personalBests.length === 0 ? (
          <p>No personal bests recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalBests.map((pb) => (
              <div
                key={pb.id}
                className="transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl bg-gray-800 border-gray-700 p-4 rounded-xl shadow text-white"
              >
                <h2 className="text-xl font-semibold">{pb.exercise}</h2>
                <p className="mt-2">
                  <strong>Weight:</strong> {pb.weight} kg
                </p>
                <p>
                  <strong>Reps:</strong> {pb.reps}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
