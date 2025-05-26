"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface MuscleGroupData {
  muscleGroup: string;
  count: number;
}

export default function MuscleGroupChart() {
  const [data, setData] = useState<MuscleGroupData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/muscle-group-frequency");
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <section className="bg-white rounded-xl shadow p-6 w-full mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        💪 Muscle Group Frequency
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="muscleGroup" type="category" />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
