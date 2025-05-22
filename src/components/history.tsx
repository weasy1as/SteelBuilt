"use client";

interface HistoryEntry {
  id: string;
  date: string;
  workoutType?: { name: string };
  exercises: any[]; // You can define a type if you want
}

export default function History({ history }: { history: HistoryEntry[] }) {
  if (!history || history.length === 0) {
    return <div>No workout history available.</div>;
  }

  return (
    <section
      aria-label="Workout History"
      className="bg-white rounded-xl p-6 shadow-md"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Workout History
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 uppercase text-gray-600 text-xs">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Exercises</th>
            </tr>
          </thead>
          <tbody>
            {history.map((w) => (
              <tr
                key={w.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  {new Date(w.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{w.workoutType?.name || "N/A"}</td>
                <td className="py-3 px-4">{w.exercises.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
