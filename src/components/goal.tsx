"use client";

import Link from "next/link";

interface GoalData {
  title: string;
  description?: string;
  targetDate?: string;
  achieved: boolean;
}

export default function Goal({ goal }: { goal: GoalData | null }) {
  if (!goal) {
    return (
      <section className="bg-yellow-200 p-6 rounded-xl shadow text-center text-gray-700 font-medium">
        🎯 No goal set yet.
      </section>
    );
  }

  const targetDate = goal.targetDate ? new Date(goal.targetDate) : null;
  const daysLeft =
    targetDate && !goal.achieved
      ? Math.ceil((targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;

  return (
    <section
      aria-label="Current Goal"
      className="bg-yellow-300 flex flex-col rounded-2xl p-6 shadow-md space-y-4 text-gray-900 border border-yellow-400"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">🏅 Golden Goal</h3>
        <span
          className={`text-sm font-semibold ${
            goal.achieved ? "text-green-700" : "text-yellow-800"
          }`}
        >
          {goal.achieved ? "Achieved ✅" : "In Progress ⏳"}
        </span>
      </div>

      <div className="space-y-1">
        <p className="text-lg font-semibold">{goal.title}</p>

        {goal.description && (
          <p className="text-sm text-gray-800">{goal.description}</p>
        )}

        {targetDate && (
          <p className="text-sm">
            📅 <strong>Target Date:</strong> {targetDate.toLocaleDateString()}
          </p>
        )}

        {daysLeft !== null && daysLeft >= 0 && (
          <p className="text-sm">
            ⏰ <strong>Time Left:</strong> {daysLeft} day{daysLeft !== 1 && "s"}
          </p>
        )}
      </div>
      <div className="mt-auto pt-2">
        <Link
          className="inline-block bg-blue-600 sm:bg-blue-400 px-4 py-2 rounded-xl text-white font-semibold hover:bg-blue-700 shadow-md transition"
          href="/goal"
        >
          Edit goals
        </Link>
      </div>
    </section>
  );
}
