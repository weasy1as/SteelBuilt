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
  loading?: boolean;
  message?: string | null;
}

const PersonalBestForm: React.FC<PersonalBestFormProps> = ({
  personalBest,
  onChange,
  onSubmit,
  loading = false,
  message = null,
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-blue-600">
        Set a Personal Best
      </h2>

      {message && (
        <div
          role="alert"
          className={`rounded px-4 py-2 ${
            message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="exercise" className="block font-medium text-gray-700">
            Exercise <span className="text-red-500">*</span>
          </label>
          <input
            id="exercise"
            type="text"
            name="exercise"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={personalBest.exercise}
            onChange={onChange}
            required
            aria-required="true"
            placeholder="e.g., Bench Press"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="weight" className="block font-medium text-gray-700">
              Weight (kg) <span className="text-red-500">*</span>
            </label>
            <input
              id="weight"
              type="number"
              name="weight"
              min={0}
              step={0.1}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={personalBest.weight}
              onChange={onChange}
              required
              aria-required="true"
              placeholder="e.g., 100"
            />
          </div>
          <div>
            <label htmlFor="reps" className="block font-medium text-gray-700">
              Reps <span className="text-red-500">*</span>
            </label>
            <input
              id="reps"
              type="number"
              name="reps"
              min={1}
              step={1}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={personalBest.reps}
              onChange={onChange}
              required
              aria-required="true"
              placeholder="e.g., 5"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400 ${
            loading ? "cursor-not-allowed bg-blue-400" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save Personal Best"}
        </button>
      </form>
    </section>
  );
};

export default PersonalBestForm;
