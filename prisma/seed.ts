import { seedingData } from "./seedingData";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function clearData() {
  await prisma.booking.deleteMany();
  await prisma.user.deleteMany();
  await prisma.room.deleteMany();
}

async function createData() {
  for (const room of seedingData.rooms) {
    await prisma.room.create({
      data: room,
    });
  }

  for (const user of seedingData.users) {
    await prisma.user.create({
      data: user,
    });
  }

  for (const booking of seedingData.bookings) {
    await prisma.booking.create({
      data: booking,
    });
  }
}

// NOTE: you can only run one function at a time, or else the async functions will run concurrently.
// Also keep in mind that when you run the clearData function, the user's id autoincrement will continue,
// so the booking's userId will not match the user's id.
async function main() {
  // await clearData();
  await createData();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
