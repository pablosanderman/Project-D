import prisma from "@/utils/prisma";
import { BookingStatus } from "@prisma/client";
import z from "zod";
import { createCallerFactory, publicProcedure, router } from "../trpc";

export const bookingRouter = router({
  create: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
        roomId: z.number(),
        status: z.enum(["CANCELLED", "CONFIRMED", "UPCOMING", "IN_PROGRESS"]),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;

      // Check if the booking time is in the past
      const currentTime = new Date();
      if (new Date(input.startTime) < currentTime) {
        throw new Error("Cannot make a booking in the past.");
      }

      // Check if a booking already exists with the same room and time slot
      const existingBooking = await prisma.booking.findFirst({
        where: {
          roomId: input.roomId,
          startTime: {
            lte: input.endTime,
          },
          endTime: {
            gte: input.startTime,
          },
          status: {
            not: "CANCELLED",
          },
        },
      });

      if (existingBooking) {
        throw new Error(
          "This room is already booked for the selected time slot."
        );
      }

      return await prisma.$transaction([
        prisma.booking.create({
          data: input,
        }),
      ]);
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const { id } = opts.input;
      return await prisma.booking.findUnique({
        where: {
          id: id,
        },
      });
    }),
  get: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        filter: z.object({
          status: z
            .enum(["CANCELLED", "CONFIRMED", "UPCOMING", "IN_PROGRESS"])
            .optional(),
          startDate: z.string().datetime().optional(),
          endDate: z.string().datetime().optional(),
          room: z.number().optional(),
          RoomType: z.enum(["MEETING", "FOCUS", "DESK"]).optional(),
          Capacity: z.number().optional(),
        }),
      })
    )
    .query(async (opts) => {
      const { userId, filter } = opts.input;
      return await prisma.booking.findMany({
        where: {
          userId: userId,
          status: filter.status,
          OR: [
            {
              startTime: {
                lte: filter.endDate,
              },
              endTime: {
                gte: filter.startDate,
              },
            },
            {
              startTime: {
                gte: filter.startDate,
              },
              endTime: {
                lte: filter.endDate,
              },
            },
          ],
          roomId: filter.room,
          room: {
            type: filter.RoomType,
            capacity: filter.Capacity,
          },
        },
        include: {
          user: true,
          room: true,
        },
      });
    }),
  getMostRecentBooking: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      return await prisma.booking.findFirst({
        where: {
          userId: userId,
        },
        orderBy: {
          startTime: "desc",
        },
      });
    }),
  setStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { id, status } = opts.input;
      return await prisma.booking.update({
        where: {
          id: id,
        },
        data: {
          status: status as BookingStatus,
        },
      });
    }),
});

// 1. create a caller-function for your router
export const createCaller = createCallerFactory(bookingRouter);
