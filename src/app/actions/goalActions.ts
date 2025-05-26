"use server";

import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function toggleGoalAchieved(goalId: string, achieved: boolean) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.goal.update({
    where: { id: goalId, userId: session.user.id },
    data: { achieved },
  });

  revalidatePath("/goals");
}

export async function deleteGoal(goalId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.goal.delete({
    where: { id: goalId, userId: session.user.id },
  });

  revalidatePath("/goals");
}
