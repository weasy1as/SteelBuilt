import { auth } from "@/auth";
import Form from "@/components/form";
import Sidebar from "@/components/sidebar";
import React from "react";

export default async function Page() {
  const session = await auth();

  return (
    <div className="w-full bg-gray-100">
      <div className="w-full">
        <Sidebar session={session} />
      </div>

      <div className=" flex flex-col justify-center items-center  p-4">
        <h1 className="text-center text-4xl font-semibold py-4 text-gray-800">
          Log Workout
        </h1>

        <div className="w-full ">
          <Form session={session} />
        </div>
      </div>
    </div>
  );
}
