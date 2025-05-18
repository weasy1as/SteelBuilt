import { PrismaClient } from "../prisma/node_modules/.prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Workout Types
  const workoutTypes = [
    { name: "Push Day" },
    { name: "Pull Day" },
    { name: "Leg Day" },
    { name: "Upper Body" },
    { name: "Lower Body" },
    { name: "Full Body" },
    { name: "Cardio" },
  ];

  for (const wt of workoutTypes) {
    await prisma.workoutType.upsert({
      where: { name: wt.name },
      update: {},
      create: wt,
    });
  }

  // Seed Muscle Groups
  const muscleGroups = [
    { name: "Chest" },
    { name: "Back" },
    { name: "Legs" },
    { name: "Shoulders" },
    { name: "Arms" },
    { name: "Core" },
  ];

  for (const mg of muscleGroups) {
    await prisma.muscleGroup.upsert({
      where: { name: mg.name },
      update: {},
      create: mg,
    });
  }

  // Seed Exercise Types with relations to muscle groups
  // First, fetch muscle groups to get their IDs
  const muscleGroupsFromDb = await prisma.muscleGroup.findMany();

  // Create a helper to get muscleGroup IDs by name
  const mgMap = new Map(muscleGroupsFromDb.map((mg: any) => [mg.name, mg.id]));

  // Define Exercise Types with muscle groups attached
  const exerciseTypes = [
    {
      name: "Bench Press",
      muscleGroupNames: ["Chest", "Arms", "Shoulders"],
    },
    {
      name: "Squat",
      muscleGroupNames: ["Legs", "Core"],
    },
    {
      name: "Deadlift",
      muscleGroupNames: ["Back", "Legs", "Core"],
    },
    {
      name: "Overhead Press",
      muscleGroupNames: ["Shoulders", "Arms"],
    },
    {
      name: "Pull-Up",
      muscleGroupNames: ["Back", "Arms"],
    },
  ];

  for (const et of exerciseTypes) {
    await prisma.exerciseType.upsert({
      where: { name: et.name },
      update: {
        // update muscle groups as well (disconnect + connect is possible but for simplicity, skip)
      },
      create: {
        name: et.name,
        muscleGroups: {
          connect: et.muscleGroupNames.map((name) => ({
            id: mgMap.get(name)!,
          })),
        },
      },
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
