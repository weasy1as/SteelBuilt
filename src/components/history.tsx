import React from "react";
import { FaHistory } from "react-icons/fa";

const History = () => {
  return (
    <div className="max-w-[1047px] h-[325px] bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <FaHistory className="text-blue-500 text-2xl" />
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Workout History
        </h1>
      </div>
      <p className="text-gray-600">
        Your recent workouts will appear here. Track your progress and stay
        motivated!
      </p>
    </div>
  );
};

export default History;
