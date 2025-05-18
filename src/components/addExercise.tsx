"use client";

import React, { useState, useEffect } from "react";

type MuscleGroup = {
  id: string;
  name: string;
};

const AddExerciseTypePage = () => {
  const [name, setName] = useState("");
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
    []
  );
  const [message, setMessage] = useState("");

  // Fetch muscle groups on mount
  useEffect(() => {
    fetch("/api/muscleGroups")
      .then((res) => res.json())
      .then((data) => setMuscleGroups(data))
      .catch(() => setMessage("Failed to load muscle groups"));
  }, []);

  const toggleMuscleGroup = (id: string) => {
    setSelectedMuscleGroups((prev) =>
      prev.includes(id) ? prev.filter((mg) => mg !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setMessage("Exercise type name cannot be empty.");
      return;
    }

    try {
      const res = await fetch("/api/exercise-types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, muscleGroupIds: selectedMuscleGroups }),
      });

      if (!res.ok) {
        throw new Error("Failed to add exercise type");
      }

      setMessage("Exercise type added successfully!");
      setName("");
      setSelectedMuscleGroups([]);
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-semibold mb-4">Add Exercise Type</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Exercise type name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />

        <fieldset>
          <legend className="font-semibold mb-2">Select Muscle Groups</legend>
          {muscleGroups.length === 0 && <p>Loading muscle groups...</p>}
          {muscleGroups.map((mg) => (
            <label key={mg.id} className="block">
              <input
                type="checkbox"
                checked={selectedMuscleGroups.includes(mg.id)}
                onChange={() => toggleMuscleGroup(mg.id)}
              />{" "}
              {mg.name}
            </label>
          ))}
        </fieldset>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Exercise Type
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AddExerciseTypePage;
