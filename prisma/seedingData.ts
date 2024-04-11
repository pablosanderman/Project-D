// enum BookingStatus {
//   CANCELLED
//   CONFIRMED
//   UPCOMING
//   IN_PROGRESS
// }

// enum RoomType {
//   MEETING
//   CONCENTRATION
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
//   bookings  Booking[]
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   type      RoomType
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
    name: "Room 1",
    type: RoomType.MEETING,
  },
  {
    name: "Room 2",
    type: RoomType.CONCENTRATION,
  },
  {
    name: "Room 3",
    type: RoomType.DESK,
  },
];

export const seedingData = {
  bookings,
  users,
  rooms,
};
