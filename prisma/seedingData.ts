// enum BookingStatus {
//   CANCELLED
//   CONFIRMED
//   UPCOMING
//   IN_PROGRESS
// }

// enum RoomType {
//   MEETING
//   FOCUS
//   DESK
// }

// model User {
//   id        Int       @id @default(autoincrement())
//   email     String    @unique
//   name      String?
//   bookings  Booking[]
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
// }

// model Booking {
//   id        Int           @id @default(autoincrement())
//   userId    Int
//   user      User          @relation(fields: [userId], references: [id])
//   createdAt DateTime      @default(now())
//   updatedAt DateTime      @updatedAt
//   startTime DateTime
//   endTime   DateTime
//   roomId    Int
//   room      Room          @relation(fields: [roomId], references: [id])
//   status    BookingStatus @default(UPCOMING)
// }

// model Room {
//   id        Int       @id @default(autoincrement())
//   name      String
//   type      RoomType
//   capacity  Int
//   floor     Int
//   navigationId String
//   bookings  Booking[]
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
// }

import { BookingStatus, RoomType } from "@prisma/client";

const bookings = [
  {
    userId: 1,
    startTime: new Date(),
    endTime: new Date(),
    roomId: 1,
    status: BookingStatus.IN_PROGRESS,
  },
  {
    userId: 2,
    startTime: new Date(),
    endTime: new Date(),
    roomId: 2,
    status: BookingStatus.CANCELLED,
  },
  {
    userId: 3,
    startTime: new Date(),
    endTime: new Date(),
    roomId: 3,
    status: BookingStatus.CONFIRMED,
  },
];

const users = [
  {
    email: "john.doe@gmail.com",
    name: "John Doe",
  },
  {
    email: "jane.doe@gmail.com",
    name: "Jane Doe",
  },
  {
    email: "bob.doe@gmail.com",
    name: "Bob Doe",
  },
];

const rooms = [
  {
    name: "PL 02.01",
    type: RoomType.MEETING,
    capacity: 8,
    floor: 2,
    navigationId: "02.01",
  },
  {
    name: "PL 02.02",
    type: RoomType.MEETING,
    capacity: 8,
    floor: 2,
    navigationId: "02.02",
  },
  {
    name: "PL 02.03",
    type: RoomType.MEETING,
    capacity: 12,
    floor: 2,
    navigationId: "02.03",
  },
  {
    name: "PL 02.04",
    type: RoomType.MEETING,
    capacity: 12,
    floor: 2,
    navigationId: "02.04",
  },
  {
    name: "PL 02.05",
    type: RoomType.MEETING,
    capacity: 12,
    floor: 2,
    navigationId: "02.05",
  },
  {
    name: "PL 02.06",
    type: RoomType.MEETING,
    capacity: 12,
    floor: 2,
    navigationId: "02.06",
  },
  {
    name: "PL 02.21",
    type: RoomType.FOCUS,
    capacity: 2,
    floor: 2,
    navigationId: "02.21",
  },
  {
    name: "PL 02.22",
    type: RoomType.FOCUS,
    capacity: 1,
    floor: 2,
    navigationId: "02.22",
  },
  {
    name: "PL 02.23",
    type: RoomType.FOCUS,
    capacity: 1,
    floor: 2,
    navigationId: "02.23",
  },
  {
    name: "PL 02.29",
    type: RoomType.MEETING,
    capacity: 6,
    floor: 2,
    navigationId: "02.29",
  },
  {
    name: "PL 02.36",
    type: RoomType.MEETING,
    capacity: 6,
    floor: 2,
    navigationId: "02.36",
  },
  {
    name: "PL 02.37",
    type: RoomType.FOCUS,
    capacity: 1,
    floor: 2,
    navigationId: "02.37",
  },
  {
    name: "PL 02.38",
    type: RoomType.FOCUS,
    capacity: 1,
    floor: 2,
    navigationId: "02.38",
  },
  ...createDeskCluster(2, 18, "02.C1"),
  ...createDeskCluster(2, 24, "02.C2"),
  ...createDeskCluster(2, 12, "02.C3"),
  ...createDeskCluster(2, 17, "02.C4"),
  ...createDeskCluster(2, 8, "02.C5"),
  ...createDeskCluster(2, 24, "02.C6"),
  ...createDeskCluster(2, 6, "02.C7"),
  ...createDeskCluster(2, 18, "02.C8"),
  ...createDeskCluster(2, 6, "02.C9"),
  ...createDeskCluster(2, 20, "02.C10"),
];

function createDeskCluster(floor: number, count: number, navigationId: string) {
  return Array.from({ length: count }, (_, index) => ({
    name: `PL ${floor}.D${index + 1}`,
    type: RoomType.DESK,
    capacity: 1,
    floor,
    navigationId: navigationId,
  }));
}

export const seedingData = {
  bookings,
  users,
  rooms,
};
