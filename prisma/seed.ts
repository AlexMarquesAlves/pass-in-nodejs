import { prisma } from "../src/lib/prisma";

export async function seed() {
  await prisma.event.create({
    data: {
      id: "b798bd9c-9d6a-4027-aa66-2fe06e9dd040",
      title: "Unite Summit",
      slug: "unite-summit",
      details: "Um evento p/ devs apaixonados(as) por código!",
      maximumAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("Database 📊 seeded! 🌱");
  prisma.$disconnect();
});
