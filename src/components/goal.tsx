import React from "react";
import { FaDumbbell, FaWeightHanging, FaRedoAlt } from "react-icons/fa";

const Goal = () => {
  return (
    <div className="flex flex-col items-center justify-between py-6 w-full sm:w-[350px] p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
        Goals
      </h1>
      <div className="w-full mt-2 space-y-3">
        <div className="flex items-center gap-2">
          <FaDumbbell className="text-purple-500" />
          <p className="font-medium text-gray-700">Exercise: Bench Press</p>
        </div>
        <div className="flex items-center gap-2">
          <FaWeightHanging className="text-green-500" />
          <p className="font-medium text-gray-700">Weight: 100 kg</p>
        </div>
        <div className="flex items-center gap-2">
          <FaRedoAlt className="text-yellow-500" />
          <p className="font-medium text-gray-700">Reps: 8</p>
        </div>
      </div>
    </div>
  );
};

export default Goal;
