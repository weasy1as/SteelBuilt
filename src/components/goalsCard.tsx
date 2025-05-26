"use client";

import React from "react";
import { deleteGoal, toggleGoalAchieved } from "@/app/actions/goalActions";

interface Goal {
  title: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  description: string | null;
  targetDate: Date | null;
  achieved: boolean;
}

const GoalsCard = ({ goals }: { goals: Goal[] }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700"
          >
            <h2 className="text-xl font-semibold">{goal.title}</h2>
            {goal.description && (
              <p className="text-gray-300 mt-1">{goal.description}</p>
            )}
            {goal.targetDate && (
              <p className="text-sm text-gray-400 mt-2">
                🎯 Target:{" "}
                {new Date(goal.targetDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
            <p
              className={`mt-2 font-semibold ${
                goal.achieved ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {goal.achieved ? "✅ Achieved" : "🚧 In Progress"}
            </p>

            <div className="mt-4 flex gap-3">
              <form action={() => toggleGoalAchieved(goal.id, !goal.achieved)}>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white text-sm"
                >
                  {goal.achieved ? "Mark Unachieved" : "Mark Achieved"}
                </button>
              </form>

              <form action={() => deleteGoal(goal.id)}>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white text-sm"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsCard;
