import { auth } from "@/auth";
import AddExerciseTypePage from "@/components/addExercise";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <AddExerciseTypePage />
    </div>
  );
}
