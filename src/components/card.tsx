"use client";

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
  data: WorkoutData | PersonalBestData | null;
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
  if (!data) {
    return (
      <EmptyState
        message={`No ${
          type === "workout" ? "workout" : "personal best"
        } data found.`}
      />
    );
  }

  return (
    <article
      aria-label={type === "workout" ? "Last Workout" : "Personal Best"}
      className="bg-black rounded-xl p-6 shadow-md space-y-4 text-white"
    >
      <h3 className="text-xl font-semibold">
        {type === "workout" ? "Last Workout" : "Personal Best"}
      </h3>

      {type === "workout" ? (
        <>
          <p>
            <strong>Date:</strong> {(data as WorkoutData).date}
          </p>
          <p>
            <strong>Type:</strong> {(data as WorkoutData).workoutType}
          </p>
          <p>
            <strong>Muscles:</strong>{" "}
            {(data as WorkoutData).muscleGroups.join(", ")}
          </p>
          {(data as WorkoutData).comments && (
            <p className="italic text-sm text-gray-600">
              "{(data as WorkoutData).comments}"
            </p>
          )}
        </>
      ) : (
        <>
          <p>
            <strong>Exercise:</strong> {(data as PersonalBestData).exercise}
          </p>
          <p>
            <strong>Weight:</strong> {(data as PersonalBestData).weight} kg
          </p>
          <p>
            <strong>Reps:</strong> {(data as PersonalBestData).reps}
          </p>
        </>
      )}
    </article>
  );
}
