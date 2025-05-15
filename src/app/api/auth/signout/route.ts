import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  "use server";
  await signOut();
  return NextResponse.json({ message: "Successfully signed out" });
}
