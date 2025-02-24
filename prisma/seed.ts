import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  // Clear existing data
  await prisma.todo.deleteMany({});

  // Create sample todos
  const todos = [
    {
      title: "Learn Prisma",
      completed: false,
      color: "red",
      status: "in-progress",
    },
    {
      title: "Build Next.js app",
      completed: true,
      color: "blue",
      status: "completed",
    },
    {
      title: "Write tests",
      completed: false,
      color: "green",
      status: "not-started",
    },
    {
      title: "Deploy to production",
      completed: false,
      color: "blue",
      status: "blocked",
    },
  ];

  for (const todo of todos) {
    await prisma.todo.create({
      data: todo,
    });
  }

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
