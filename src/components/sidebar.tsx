"use client";

import { Session } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await fetch("/api/signout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div>
      {/* Burger Menu Button (Mobile Only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 text-white bg-gray-900 fixed top-0 left-0 z-50"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col max-w-[300px] h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        {/* Logo/Header */}
        <div className="py-6 px-4 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            <span>🏋️</span> SteelBuilt
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4">
          <ul className="flex flex-col gap-4">
            <li className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
              <Link href="/">Home</Link>
            </li>
            <li className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
              <Link href="/log">Log workout</Link>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="px-4 py-6 flex flex-col items-center space-y-4">
          <p className="text-gray-200 text-lg font-semibold text-center">
            Signed in as{" "}
            <span className="font-bold text-blue-600">
              {session?.user?.name}
            </span>
          </p>
          <button
            onClick={handleSignOut}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-gray-900 to-black text-white z-40">
          <div className="flex flex-col justify-center h-full p-6">
            <ul className="flex flex-col gap-4">
              <li className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
                <Link href="/">Home</Link>
              </li>
              <li className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
                <Link href="/log">Log workout</Link>
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
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-xl mt-4 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500"
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
