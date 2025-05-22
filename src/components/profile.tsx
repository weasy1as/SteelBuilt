"use client";

import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import Sidebar from "@/components/sidebar";
import PersonalBestForm from "@/components/prForm";
import GoalForm from "@/components/goalForm";

interface PersonalBest {
  exercise: string;
  weight: string;
  reps: string;
}

interface Goal {
  title: string;
  description: string;
  targetDate: string;
}

export default function ProfilePage({ session }: { session: Session | null }) {
  const [personalBest, setPersonalBest] = useState<PersonalBest>({
    exercise: "",
    weight: "",
    reps: "",
  });

  const [goal, setGoal] = useState<Goal>({
    title: "",
    description: "",
    targetDate: "",
  });

  const [loadingPB, setLoadingPB] = useState(false);
  const [loadingGoal, setLoadingGoal] = useState(false);

  const [messagePB, setMessagePB] = useState<string | null>(null);
  const [messageGoal, setMessageGoal] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchData = async () => {
      try {
        const [pbRes, goalRes] = await Promise.all([
          fetch("/api/personalBest"),
          fetch("/api/goals"),
        ]);

        if (pbRes.ok) {
          const pbData = await pbRes.json();
          if (pbData) {
            setPersonalBest({
              exercise: pbData.exercise || "",
              weight: pbData.weight?.toString() || "",
              reps: pbData.reps?.toString() || "",
            });
          }
        }

        if (goalRes.ok) {
          const goalData = await goalRes.json();
          if (goalData) {
            setGoal({
              title: goalData.title || "",
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

  const handlePersonalBestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalBest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGoalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGoal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePersonalBestSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMessagePB(null);

    // Basic validation
    if (
      !personalBest.exercise.trim() ||
      !personalBest.weight.trim() ||
      !personalBest.reps.trim()
    ) {
      setMessagePB("Please fill all fields in Personal Best.");
      return;
    }
    if (Number(personalBest.weight) <= 0) {
      setMessagePB("Weight must be greater than zero.");
      return;
    }
    if (parseInt(personalBest.reps) <= 0) {
      setMessagePB("Reps must be greater than zero.");
      return;
    }

    setLoadingPB(true);
    try {
      const res = await fetch("/api/personalBest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...personalBest,
          weight: parseFloat(personalBest.weight),
          reps: parseInt(personalBest.reps, 10),
        }),
      });

      if (!res.ok) throw new Error("Failed to save personal best.");

      setMessagePB("Personal best saved successfully!");
    } catch (error) {
      setMessagePB((error as Error).message || "Error saving personal best.");
    } finally {
      setLoadingPB(false);
    }
  };

  const handleGoalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageGoal(null);

    if (!goal.title.trim()) {
      setMessageGoal("Please enter a goal title.");
      return;
    }

    setLoadingGoal(true);
    try {
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

      if (!res.ok) throw new Error("Failed to save goal.");

      setMessageGoal("Goal saved successfully!");
    } catch (error) {
      setMessageGoal((error as Error).message || "Error saving goal.");
    } finally {
      setLoadingGoal(false);
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <aside className="w-full">
        <Sidebar session={session} />
      </aside>

      <main className="w-full md:w-4/5 p-6 space-y-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Fitness Dashboard
        </h1>

        <PersonalBestForm
          personalBest={personalBest}
          onChange={handlePersonalBestChange}
          onSubmit={handlePersonalBestSubmit}
          loading={loadingPB}
          message={messagePB}
        />

        <GoalForm
          goal={goal}
          onChange={handleGoalChange}
          onSubmit={handleGoalSubmit}
          loading={loadingGoal}
          message={messageGoal}
        />
      </main>
    </div>
  );
}
