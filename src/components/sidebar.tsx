import { signOut } from "@/auth";
import Link from "next/link";
import React from "react";

const Sidebar = ({ session }: { session: object }) => {
  return (
    <div className="py-6 px-4 flex flex-col justify-between items-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div>
        <h1 className="flex flex-col items-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          <span>🏋️</span> SteelBuilt
        </h1>
      </div>
      <div className="w-full">
        <ul className="w-full flex flex-col gap-4">
          <li className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg w-full ">
            <Link href={""}>Home</Link>
          </li>
          <li className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg w-full ">
            <Link href={""}>Log workout</Link>
          </li>
          <li className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg w-full ">
            <Link href={""}>Home</Link>
          </li>
        </ul>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="flex flex-col items-center justify-center space-y-4 p-4"
      >
        <p className="text-gray-200 text-lg font-semibold">
          Signed in as{" "}
          <span className="font-bold text-blue-600">{session.user.name}</span>
        </p>

        <button
          type="submit"
          className="w-full py-2 px-4 cursor-pointer bg-red-600 rounded-xl text-white font-semibold text-lg transition-transform transform hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 hover:ring-2"
        >
          Sign out
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
