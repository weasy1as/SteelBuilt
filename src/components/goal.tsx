// components/goal.tsx
import React from "react";
import { FaBullseye, FaCalendarAlt, FaClipboardCheck } from "react-icons/fa";

interface GoalProps {
  goal: {
    title: string;
    description?: string;
    targetDate?: Date;
    achieved: boolean;
  };
}

const Goal = ({ goal }: GoalProps) => {
  return (
    <div className="flex flex-col items-center justify-between py-6 w-full sm:w-[350px] p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
        Current Goal
      </h1>
      <div className="w-full mt-2 space-y-3">
        <div className="flex items-center gap-2">
          <FaBullseye className="text-purple-500" />
          <p className="font-medium text-gray-700">Title: {goal.title}</p>
        </div>
        {goal.description && (
          <div className="flex items-center gap-2">
            <FaClipboardCheck className="text-green-500" />
            <p className="font-medium text-gray-700">
              Description: {goal.description}
            </p>
          </div>
        )}
        {goal.targetDate && (
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <p className="font-medium text-gray-700">
              Target: {new Date(goal.targetDate).toLocaleDateString()}
            </p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <FaClipboardCheck className="text-yellow-500" />
          <p className="font-medium text-gray-700">
            Status: {goal.achieved ? "Achieved ✅" : "In Progress ⏳"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Goal;
