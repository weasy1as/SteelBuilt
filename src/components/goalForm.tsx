// components/GoalForm.tsx
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
}

const GoalForm: React.FC<GoalFormProps> = ({ goal, onChange, onSubmit }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-purple-600">Set a Goal</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={goal.title}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            rows={4}
            value={goal.description}
            onChange={onChange}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Target Date</label>
          <input
            type="date"
            name="targetDate"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={goal.targetDate}
            onChange={onChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Save Goal
        </button>
      </form>
    </section>
  );
};

export default GoalForm;
