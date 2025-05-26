"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Session } from "next-auth";
import toast from "react-hot-toast";

interface Exercise {
  type: string;
  sets: number | "";
  reps: number | "";
  weight: number | "";
}

interface WorkoutType {
  id: string;
  name: string;
}

interface ExerciseType {
  id: string;
  name: string;
}

const Form = ({ session }: { session: Session | null }) => {
  const [exercises, setExercises] = useState<Exercise[]>([
    { type: "", sets: "", reps: "", weight: "" },
  ]);

  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [workoutRes, exerciseRes] = await Promise.all([
          fetch("/api/workoutTypes"),
          fetch("/api/exerciseTypes"),
        ]);
        if (!workoutRes.ok || !exerciseRes.ok) {
          throw new Error("Failed to fetch data");
        }
        const workoutData: WorkoutType[] = await workoutRes.json();
        const exerciseData: ExerciseType[] = await exerciseRes.json();

        setWorkoutTypes(workoutData);
        setExerciseTypes(exerciseData);
      } catch (e) {
        setMessage("Failed to load data. Please try again later.");
      }
    }
    fetchData();
  }, []);

  const addExercise = () => {
    setExercises([...exercises, { type: "", sets: "", reps: "", weight: "" }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const updated = exercises.map((ex, i) =>
      i === index ? { ...ex, [field]: value } : ex
    );
    setExercises(updated);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Validate exercises before submitting
      for (const ex of exercises) {
        if (!ex.type || ex.sets === "" || ex.reps === "" || ex.weight === "") {
          setMessage("Please fill all exercise fields.");
          setLoading(false);
          return;
        }
        if (Number(ex.sets) <= 0 || Number(ex.reps) <= 0) {
          setMessage("Sets and reps must be greater than zero.");
          setLoading(false);
          return;
        }
      }

      const workout = {
        userId: session?.user?.id,
        date: formData.get("date"),
        comments: formData.get("comments"),
        workoutTypeId: formData.get("workoutType"),
        exercises: exercises.map((e) => ({
          sets: Number(e.sets),
          reps: Number(e.reps),
          weight: Number(e.weight),
          exerciseTypeId: e.type,
        })),
      };

      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
      });

      if (!response.ok) {
        throw new Error("Failed to save workout");
      }

      const result = await response.json();

      if (result.newPersonalBests?.length > 0) {
        result.newPersonalBests.forEach((pb) => {
          toast.success(
            `🔥 New Personal Best: ${pb.exercise} - ${pb.weight} kg x ${pb.reps} reps`
          );
        });
      } else {
        toast.success("Workout logged successfully!");
      }
      setExercises([{ type: "", sets: "", reps: "", weight: "" }]);
      form.reset();
    } catch (error) {
      setMessage((error as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl py-6 px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">
        Workout Details
      </h1>

      {message && (
        <div
          role="alert"
          className={`mb-4 p-3 rounded ${
            message.includes("success")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="date"
            className="block mb-1 font-medium text-gray-700"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="workoutType"
            className="block mb-1 font-medium text-gray-700"
          >
            Workout Type <span className="text-red-500">*</span>
          </label>
          <select
            id="workoutType"
            name="workoutType"
            required
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select Workout type
            </option>
            {workoutTypes.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="comments"
            className="block mb-1 font-medium text-gray-700"
          >
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            placeholder="Add any comments about your workout..."
            rows={4}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 resize-none focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <section aria-label="Exercises" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Exercises
          </h2>

          {exercises.map((exercise, idx) => (
            <div
              key={idx}
              className="flex flex-wrap items-center gap-4 mb-4 border rounded-lg p-4 bg-gray-50"
            >
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor={`exerciseType-${idx}`}
                  className="block mb-1 font-medium text-gray-700"
                >
                  Exercise Type <span className="text-red-500">*</span>
                </label>
                <select
                  id={`exerciseType-${idx}`}
                  value={exercise.type}
                  onChange={(e) => updateExercise(idx, "type", e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="" disabled>
                    Select Exercise type
                  </option>
                  {exerciseTypes.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col min-w-[70px]">
                <label
                  htmlFor={`sets-${idx}`}
                  className="mb-1 font-medium text-gray-700"
                >
                  Sets <span className="text-red-500">*</span>
                </label>
                <input
                  id={`sets-${idx}`}
                  type="number"
                  min={1}
                  value={exercise.sets}
                  onChange={(e) =>
                    updateExercise(
                      idx,
                      "sets",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  required
                  className="rounded-lg border-2 border-gray-300 px-3 py-2 w-full focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col min-w-[70px]">
                <label
                  htmlFor={`reps-${idx}`}
                  className="mb-1 font-medium text-gray-700"
                >
                  Reps <span className="text-red-500">*</span>
                </label>
                <input
                  id={`reps-${idx}`}
                  type="number"
                  min={1}
                  value={exercise.reps}
                  onChange={(e) =>
                    updateExercise(
                      idx,
                      "reps",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  required
                  className="rounded-lg border-2 border-gray-300 px-3 py-2 w-full focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col min-w-[90px]">
                <label
                  htmlFor={`weight-${idx}`}
                  className="mb-1 font-medium text-gray-700"
                >
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  id={`weight-${idx}`}
                  type="number"
                  min={0}
                  step="0.1"
                  value={exercise.weight}
                  onChange={(e) =>
                    updateExercise(
                      idx,
                      "weight",
                      e.target.value === "" ? "" : parseFloat(e.target.value)
                    )
                  }
                  required
                  className="rounded-lg border-2 border-gray-300 px-3 py-2 w-full focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="button"
                aria-label={`Remove exercise ${idx + 1}`}
                onClick={() => removeExercise(idx)}
                className="text-red-600 hover:text-red-800 transition rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                title="Remove exercise"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addExercise}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 font-semibold transition focus:outline-none focus:ring-4 focus:ring-green-400"
          >
            + Add Exercise
          </button>
        </section>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-3 font-semibold rounded-lg text-white transition focus:outline-none focus:ring-4 ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          }`}
        >
          {loading ? "Saving..." : "Save Workout"}
        </button>
      </form>
    </div>
  );
};

export default Form;
