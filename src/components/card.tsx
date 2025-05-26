"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface WorkoutData {
  date: string;
  workoutType: string;
  muscleGroups: string[];
  comments?: string;
}

interface PersonalBestData {
  exercise: string;
  weight: number;
  reps: number;
}

interface WorkoutCardProps {
  type: "workout" | "personalBest";
  data: WorkoutData | PersonalBestData[] | null;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="bg-gray-50 text-gray-500 rounded-xl p-6 shadow text-center"
    >
      {message}
    </div>
  );
}

export default function Card({ type, data }: WorkoutCardProps) {
  if (
    !data ||
    (type === "personalBest" && (data as PersonalBestData[]).length === 0)
  ) {
    return (
      <EmptyState
        message={`No ${
          type === "workout" ? "workout" : "personal best"
        } data found.`}
      />
    );
  }

  if (type === "workout") {
    const workout = data as WorkoutData;
    return (
      <article
        aria-label="Last Workout"
        className="bg-gray-800 rounded-xl p-6 shadow-md space-y-4 text-white"
      >
        <h3 className="text-xl font-semibold">Last Workout</h3>
        <p>
          <strong>Date:</strong> {workout.date}
        </p>
        <p>
          <strong>Type:</strong> {workout.workoutType}
        </p>
        <p>
          <strong>Muscles:</strong> {workout.muscleGroups.join(", ")}
        </p>
        {workout.comments && (
          <p className="italic text-sm text-gray-400">"{workout.comments}"</p>
        )}
      </article>
    );
  }

  const personalBests = data as PersonalBestData[];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % personalBests.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [personalBests.length]);

  const pb = personalBests[current];

  return (
    <article
      aria-label="Personal Best"
      className="bg-gray-800 rounded-xl p-6 shadow-md text-white  relative overflow-hidden"
    >
      <h3 className="text-xl font-semibold mb-2">Personal Best</h3>
      <div className="relative h-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full space-y-2"
          >
            <p>
              <strong>Exercise:</strong> {pb.exercise}
            </p>
            <p>
              <strong>Weight:</strong> {pb.weight} kg
            </p>
            <p>
              <strong>Reps:</strong> {pb.reps}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="text-center text-sm text-white font-bold mt-4">
        {current + 1} / {personalBests.length}
      </p>
      <div className="mt-auto pt-2 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6">
        <Link
          className=" sm:bg-blue-400 px-4 py-2 rounded-xl bg-blue-600 hover:shadow-md text-white font-semibold hover:bg-blue-600"
          href={"/personalBest"}
        >
          Go to PR´s
        </Link>
      </div>
    </article>
  );
}
