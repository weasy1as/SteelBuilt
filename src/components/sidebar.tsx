"use client";
import { Session } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await fetch("/api/signout", {
      method: "POST",
    });
    window.location.reload(); // Refresh to clear session state
  };

  return (
    <div>
      {/* Burger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 text-white bg-gray-900 fixed top-0 left-0 z-50"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Desktop Sidebar */}
      <div
        className={`py-6 px-4 md:flex flex-col max-w-[300px] justify-between items-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white hidden`}
      >
        <div>
          <h1 className="flex flex-col items-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            <span>🏋️</span> SteelBuilt
          </h1>
        </div>

        <div className="w-full">
          <ul className="w-full flex flex-col gap-4">
            <li className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg w-full ">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg w-full ">
              <Link href={"/log"}>Log workout</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <p className="text-gray-200 text-lg font-semibold">
            Signed in as{" "}
            <span className="font-bold text-blue-600">
              {session?.user?.name}
            </span>
          </p>

          <button
            onClick={handleSignOut}
            className="w-full py-2 px-4 cursor-pointer bg-red-600 rounded-xl text-white font-semibold text-lg transition-transform transform hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 hover:ring-2"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-gray-900 to-black text-white z-40">
          <div className="flex flex-col justify-center h-screen w-full p-6">
            <ul className="w-full flex flex-col gap-4">
              <li className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg w-full ">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg w-full ">
                <Link href={"/log"}>Log workout</Link>
              </li>
            </ul>

            <div className="mt-8 text-center">
              <p className="text-gray-200 text-lg font-semibold">
                Signed in as{" "}
                <span className="font-bold text-blue-600">
                  {session?.user?.name}
                </span>
              </p>
              <button
                onClick={handleSignOut}
                className="w-full py-2 px-4 cursor-pointer bg-red-600 rounded-xl text-white font-semibold text-lg transition-transform transform hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 hover:ring-2 mt-4"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
