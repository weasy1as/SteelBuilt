"use client";

import React from "react";

interface GoalFormProps {
  goal: {
    title: string;
    description: string;
    targetDate: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  message?: string | null;
}

const GoalForm: React.FC<GoalFormProps> = ({
  goal,
  onChange,
  onSubmit,
  loading = false,
  message = null,
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-purple-600">Set a Goal</h2>

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
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={goal.title}
            onChange={onChange}
            required
            aria-required="true"
            placeholder="e.g., Run a marathon"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows={4}
            value={goal.description}
            onChange={onChange}
            placeholder="Optional details about your goal"
          />
        </div>

        <div>
          <label
            htmlFor="targetDate"
            className="block font-medium text-gray-700"
          >
            Target Date <span className="text-red-500">*</span>
          </label>
          <input
            id="targetDate"
            type="date"
            name="targetDate"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={goal.targetDate}
            onChange={onChange}
            required
            aria-required="true"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-purple-400 ${
            loading ? "cursor-not-allowed bg-purple-400" : "hover:bg-purple-700"
          }`}
        >
          {loading ? "Saving..." : "Save Goal"}
        </button>
      </form>
    </section>
  );
};

export default GoalForm;
