// components/PersonalBestForm.tsx
"use client";

import React from "react";

interface PersonalBestFormProps {
  personalBest: {
    exercise: string;
    weight: string;
    reps: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PersonalBestForm: React.FC<PersonalBestFormProps> = ({
  personalBest,
  onChange,
  onSubmit,
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-blue-600">
        Set a Personal Best
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Exercise</label>
          <input
            type="text"
            name="exercise"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={personalBest.exercise}
            onChange={onChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={personalBest.weight}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Reps</label>
            <input
              type="number"
              name="reps"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={personalBest.reps}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Save Personal Best
        </button>
      </form>
    </section>
  );
};

export default PersonalBestForm;
