import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "@/components/sidebar";
import GoalsCard from "@/components/goalsCard";

export default async function GoalsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const goals = await prisma.goal.findMany({
    where: { userId: session.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="">
      <div>
        <Sidebar session={session} />
      </div>
      <div className="p-6 text-white bg-gradient-to-b from-gray-900 to-black min-h-screen">
        <h1 className="text-3xl font-bold mb-6">🎯 Your Goals</h1>

        {goals.length === 0 ? (
          <p className="text-gray-400">You have no goals yet.</p>
        ) : (
          <GoalsCard goals={goals} />
        )}
      </div>
    </div>
  );
}
