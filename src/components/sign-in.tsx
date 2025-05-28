"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          🏋️ SteelBuilt
        </h1>
        <p className="mt-2 text-xl text-gray-300 max-w-md">
          Unlock your true strength. Track progress, hit new PRs, and build the
          body you’ve always dreamed of.
        </p>
      </div>

      <button
        type="submit"
        onClick={() => signIn("google")}
        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
      >
        Sign In with Google
      </button>
    </div>
  );
}
