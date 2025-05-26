"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface GoalData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  title: string;
  description: string | null;
  targetDate: Date | null;
  achieved: boolean;
}

export default function GoalCarousel({ goals }: { goals: GoalData[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (goals.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % goals.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [goals.length]);

  if (goals.length === 0) {
    return (
      <section className="bg-yellow-200 p-6 rounded-xl shadow text-center text-gray-700 font-medium">
        🎯 No goals set yet.
      </section>
    );
  }

  const goal = goals[current];
  const targetDate = goal.targetDate ? new Date(goal.targetDate) : null;
  const daysLeft =
    targetDate && !goal.achieved
      ? Math.ceil((targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;

  return (
    <section
      aria-label="Current Goal"
      className="bg-yellow-300 flex flex-col rounded-2xl p-4 sm:p-6 shadow-md space-y-4 text-gray-900 border border-yellow-400 max-w-xl w-full mx-auto"
    >
      <div className="flex flex-col items-start sm:items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold mb-2">🏅 Golden Goal</h3>
        <div className="relative h-36 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full space-y-2"
            >
              <span
                className={`text-sm font-semibold ${
                  goal.achieved ? "text-green-700" : "text-yellow-800"
                }`}
              >
                {goal.achieved ? "Achieved ✅" : "In Progress ⏳"}
              </span>

              <p className="text-base sm:text-lg font-semibold">{goal.title}</p>

              {goal.description && (
                <p className="text-sm text-gray-800">{goal.description}</p>
              )}

              {targetDate && (
                <p className="text-sm">
                  📅 <strong>Target Date:</strong>{" "}
                  {targetDate.toLocaleDateString()}
                </p>
              )}

              {daysLeft !== null && daysLeft >= 0 && (
                <p className="text-sm">
                  ⏰ <strong>Time Left:</strong> {daysLeft} day
                  {daysLeft !== 1 && "s"}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-auto pt-2 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6">
        <Link
          className="w-full sm:w-auto text-center bg-blue-600 sm:bg-blue-400 px-4 py-2 rounded-xl text-white font-semibold hover:bg-blue-700 shadow-md transition"
          href="/goals"
        >
          Edit goals
        </Link>

        <div className="flex space-x-2 flex-wrap justify-center">
          {goals.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to goal ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === current ? "bg-yellow-700" : "bg-yellow-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
