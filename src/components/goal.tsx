"use client";

interface GoalData {
  title: string;
  description?: string;
  targetDate?: string;
  achieved: boolean;
}

export default function Goal({ goal }: { goal: GoalData | null }) {
  if (!goal) {
    return <div>No goal set yet.</div>;
  }

  return (
    <section
      aria-label="Current Goal"
      className="bg-yellow-300  rounded-xl p-6 shadow-md space-y-3 text-balck"
    >
      <h3 className="text-xl font-semibold">Current Goal</h3>
      <p>
        <strong>Title:</strong> {goal.title}
      </p>
      {goal.description && (
        <p>
          <strong>Description:</strong> {goal.description}
        </p>
      )}
      {goal.targetDate && (
        <p>
          <strong>Target Date:</strong>{" "}
          {new Date(goal.targetDate).toLocaleDateString()}
        </p>
      )}
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={
            goal.achieved
              ? "text-green-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {goal.achieved ? "Achieved" : "In Progress"}
        </span>
      </p>
    </section>
  );
}
