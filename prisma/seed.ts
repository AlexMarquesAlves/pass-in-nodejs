import { prisma } from "../src/lib/prisma";

export async function seed() {
  await prisma.event.create({
    data: {
      id: "9e9bd979-9d10-4915-b339-3786b1634f33",
      title: "NLW Unite Summit",
      slug: "nlw-unite-summit",
      details: "Um evento p/ devs apaixonados(as) por código!",
      maximumAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
