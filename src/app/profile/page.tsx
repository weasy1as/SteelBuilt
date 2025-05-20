import { auth } from "@/auth";
import ProfilePage from "@/components/profile";
import Sidebar from "@/components/sidebar";
import React from "react";

const page = () => {
  const session = auth();
  return (
    <div className="h-screen w-full">
      <div>
        <ProfilePage session={session} />
      </div>
    </div>
  );
};

export default page;
