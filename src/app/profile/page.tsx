import { auth } from "@/auth";
import ProfilePage from "@/components/profile";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";
import React from "react";

export default async function Profile() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-full">
      <Sidebar session={session} />
      <div>
        <ProfilePage session={session} />
      </div>
    </div>
  );
}
