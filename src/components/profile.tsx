// app/profile/page.tsx or wherever your Profile page lives
"use client";

import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import Sidebar from "@/components/sidebar";
import PersonalBestForm from "@/components/prForm";
import GoalForm from "@/components/goalForm";

export default function ProfilePage({ session }: { session: Session | null }) {
  const [personalBest, setPersonalBest] = useState({
    exercise: "",
    weight: "",
    reps: "",
  });

  const [goal, setGoal] = useState({
    title: "",
    description: "",
    targetDate: "",
  });

  // Fetch existing Goal and PersonalBest on load
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      try {
        const [pbRes, goalRes] = await Promise.all([
          fetch("/api/personalBest"),
          fetch("/api/goals"),
        ]);

        if (pbRes.ok) {
          const pbData = await pbRes.json();
          if (pbData) {
            setPersonalBest({
              exercise: pbData.exercise,
              weight: pbData.weight.toString(),
              reps: pbData.reps.toString(),
            });
          }
        }

        if (goalRes.ok) {
          const goalData = await goalRes.json();
          if (goalData) {
            setGoal({
              title: goalData.title,
              description: goalData.description || "",
              targetDate: goalData.targetDate
                ? new Date(goalData.targetDate).toISOString().split("T")[0]
                : "",
            });
          }
        }
      } catch (err) {
        console.error("Failed to load user data:", err);
      }
    };

    fetchData();
  }, [session?.user?.id]);

  // Input change handlers
  const handlePersonalBestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalBest({ ...personalBest, [e.target.name]: e.target.value });
  };

  const handleGoalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  // Submit Personal Best
  const handlePersonalBestSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const res = await fetch("/api/personalBest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...personalBest,
        weight: parseFloat(personalBest.weight),
        reps: parseInt(personalBest.reps),
      }),
    });

    if (!res.ok) {
      console.error("Failed to save personal best.");
    }
  };

  // Submit Goal
  const handleGoalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...goal,
        targetDate: goal.targetDate
          ? new Date(goal.targetDate).toISOString()
          : null,
      }),
    });

    if (!res.ok) {
      console.error("Failed to save goal.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/5">
        <Sidebar session={session} />
      </div>

      <main className="w-full md:w-4/5 p-6 space-y-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Fitness Dashboard
        </h1>

        <PersonalBestForm
          personalBest={personalBest}
          onChange={handlePersonalBestChange}
          onSubmit={handlePersonalBestSubmit}
        />

        <GoalForm
          goal={goal}
          onChange={handleGoalChange}
          onSubmit={handleGoalSubmit}
        />
      </main>
    </div>
  );
}
