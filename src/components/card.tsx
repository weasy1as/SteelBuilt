import React from "react";
import {
  FaCalendarAlt,
  FaDumbbell,
  FaClipboardList,
  FaComments,
} from "react-icons/fa";

interface WorkoutData {
  date: string;
  workoutType: string;
  muscleGroups: string[];
  comments: string;
}

interface PersonalBestData {
  exercise: string;
  weight: number;
  reps: number;
}

const Card = ({
  type,
  data,
}: {
  type: "workout" | "personalBest";
  data: WorkoutData | PersonalBestData;
}) => {
  return (
    <div className="flex flex-col items-center justify-between py-6 w-full sm:w-[350px] p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
        {type === "workout" ? "Last Workout" : "Personal Best"}
      </h1>

      <div className="w-full mt-2 space-y-3">
        {type === "workout" ? (
          <>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              <p className="font-medium text-gray-700">Date: {data.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaDumbbell className="text-purple-500" />
              <p className="font-medium text-gray-700">
                Workout Type: {data.workoutType}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaClipboardList className="text-green-500" />
              <p className="font-medium text-gray-700">
                Muscle Groups: {data.muscleGroups.join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaComments className="text-yellow-500" />
              <p className="font-medium text-gray-700">
                Comments: {data.comments}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <FaDumbbell className="text-purple-500" />
              <p className="font-medium text-gray-700">
                Exercise: {data.exercise}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaDumbbell className="text-green-500" />
              <p className="font-medium text-gray-700">
                Weight: {data.weight} kg
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaDumbbell className="text-yellow-500" />
              <p className="font-medium text-gray-700">Reps: {data.reps}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
