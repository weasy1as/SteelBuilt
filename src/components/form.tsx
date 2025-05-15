"use client";
import React, { useState } from "react";

interface WorkoutFormData {
  date: string;
  workoutType: string;
  muscleGroups: string;
  comments: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }[];
}

const Form = () => {
  const [formData, setFormData] = useState<WorkoutFormData>({
    date: "",
    workoutType: "",
    muscleGroups: "",
    comments: "",
    exercises: [
      {
        name: "",
        sets: 0,
        reps: 0,
        weight: 0,
      },
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      const updatedExercises = [...formData.exercises];
      updatedExercises[index] = {
        ...updatedExercises[index],
        [name]: value,
      };
      setFormData({ ...formData, exercises: updatedExercises });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        { name: "", sets: 0, reps: 0, weight: 0 },
      ],
    });
  };

  const removeExercise = (index: number) => {
    const updatedExercises = formData.exercises.filter((_, i) => i !== index);
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-sm w-full"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Workout Details</h2>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        className="p-2 border rounded"
        required
      />

      <input
        type="text"
        name="workoutType"
        placeholder="Workout Type (e.g. Strength, Cardio)"
        value={formData.workoutType}
        onChange={handleInputChange}
        className="p-2 border rounded"
        required
      />

      <input
        type="text"
        name="muscleGroups"
        placeholder="Muscle Groups (comma-separated)"
        value={formData.muscleGroups}
        onChange={handleInputChange}
        className="p-2 border rounded"
        required
      />

      <textarea
        name="comments"
        placeholder="Comments"
        value={formData.comments}
        onChange={handleInputChange}
        className="p-2 border rounded"
      />

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">Exercises</h3>

        {formData.exercises.map((exercise, index) => (
          <div key={index} className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              name="name"
              placeholder="Exercise Name"
              value={exercise.name}
              onChange={(e) => handleInputChange(e, index)}
              className="p-2 border rounded flex-grow"
              required
            />
            <input
              type="number"
              name="sets"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) => handleInputChange(e, index)}
              className="p-2 border rounded w-16"
              required
            />
            <input
              type="number"
              name="reps"
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) => handleInputChange(e, index)}
              className="p-2 border rounded w-16"
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={exercise.weight}
              onChange={(e) => handleInputChange(e, index)}
              className="p-2 border rounded w-20"
              required
            />
            <button
              type="button"
              onClick={() => removeExercise(index)}
              className="text-red-600 hover:text-red-800"
            >
              ✖
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addExercise}
          className="p-2 bg-blue-500 text-white rounded mt-2 hover:bg-blue-600"
        >
          ➕ Add Exercise
        </button>
      </div>

      <button
        type="submit"
        className="p-3 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
      >
        Save Workout
      </button>
    </form>
  );
};

export default Form;
