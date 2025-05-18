"use client";

import React, { useEffect, useState } from "react";

const Form = () => {
  const [exercises, setExercises] = useState([
    { type: "", sets: 0, reps: 0, weight: 0 },
  ]);

  const [exerciseType, setExerciseType] = useState([]);

  const [message, setMessage] = useState();

  const [muscleGroups, setMuscleGroups] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/muscleGroups").then((res) => res.json()),
      fetch("/api/exerciseTypes").then((res) => res.json()),
    ])
      .then(([muscleGroupsData, exerciseTypesData]) => {
        setMuscleGroups(muscleGroupsData);
        setExerciseType(exerciseTypesData);
      })
      .catch(() => setMessage("Failed to load data"));
  }, []);

  // Handler to add a new exercise row
  const addExercise = () => {
    setExercises([...exercises, { type: "", sets: 0, reps: 0, weight: 0 }]);
  };

  // Handler to remove an exercise row
  const removeExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  // Handler to update exercise details
  const updateExercise = (index: number, field: string, value: any) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updatedExercises);
  };

  // Placeholder for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Workout logged:", exercises);
    // Call your API or backend logic here
  };

  return (
    <div className="bg-white rounded-md shadow-2xl py-4 px-6 mx-6 w-auto">
      <h1 className="text-2xl font-semibold mb-4">Workout Details</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="font-medium">Date:</label>
        <input
          className="bg-white h-[40px] px-4 rounded-xl shadow-2xl border-2 border-black"
          type="date"
        />

        <label className="font-medium">Workout Type:</label>
        <select className="bg-white  h-[40px] px-4  rounded-xl shadow-2xl border-2 border-black">
          <option value="">Select Workout type</option>
          {exerciseType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label className="font-medium">Comments:</label>
        <textarea
          className="bg-white px-4 py-2 rounded-xl h-[150px] shadow-2xl border-2 border-black"
          placeholder="Add any comments about your workout..."
        ></textarea>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold mt-4">Exercises</h1>

          {exercises.map((exercise, index) => (
            <div key={index} className="flex gap-3 items-center">
              <select
                className="bg-white h-[40px] w-full px-4  rounded-xl shadow-2xl border-2 border-black"
                value={exercise.type}
                onChange={(e) => updateExercise(index, "type", e.target.value)}
              >
                <option value="">Select Exercise type</option>
                {exerciseType.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <label htmlFor="">Sets</label>
              <input
                className="bg-white h-[40px] px-4 w-12 rounded-xl shadow-2xl border-2 border-black"
                type="number"
                value={exercise.sets}
                onChange={(e) =>
                  updateExercise(index, "sets", parseInt(e.target.value))
                }
              />

              <label htmlFor="">Reps</label>
              <input
                className="bg-white h-[40px] px-4 w-12 rounded-xl shadow-2xl border-2 border-black"
                type="number"
                value={exercise.reps}
                onChange={(e) =>
                  updateExercise(index, "reps", parseInt(e.target.value))
                }
              />

              <label htmlFor="">Weight</label>
              <input
                className="bg-white h-[40px] w-12 px-4 rounded-xl shadow-2xl border-2 border-black"
                type="number"
                value={exercise.weight}
                onChange={(e) =>
                  updateExercise(index, "weight", parseFloat(e.target.value))
                }
              />

              <button
                type="button"
                onClick={() => removeExercise(index)}
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addExercise}
            className="w-full bg-green-500 rounded-sm text-white py-2 mt-3"
          >
            + Add exercise
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 rounded-sm text-white py-2 mt-5"
          >
            Save Workout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
