"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Sidebar = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await fetch("/api/signout", { method: "POST" });
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="w-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="text-white text-2xl font-bold tracking-tight">
          SteelBuilt
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-white font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>{" "}
          <li>
            <Link href="/log">Log workout</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>

        {/* User info and sign out */}
        <div className="hidden md:flex items-center gap-4 text-white">
          <div className="flex items-center gap-2">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-2xl" />
            )}
            <p className="font-semibold">{session?.user?.name || "User"}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >
            Sign out
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 text-white px-4 pb-4 pt-2 space-y-3">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/log" className="block">
            Log workout
          </Link>
          <Link href="/profile" className="block">
            Profile
          </Link>

          <div className="pt-4 border-t border-white/20">
            <p className="text-sm">Signed in as:</p>
            <p className="font-semibold">{session?.user?.name || "User"}</p>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="mt-2 bg-red-500 hover:bg-red-600 w-full text-white px-4 py-2 rounded-xl transition"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
