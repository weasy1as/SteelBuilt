import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <SignIn />
    </div>
  );
}
