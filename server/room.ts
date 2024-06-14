import { router, publicProcedure, createCallerFactory } from "../trpc";
import z from "zod";
import prisma from "@/utils/prisma";
import { TRPCError } from "@trpc/server";

export const roomRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.enum(["MEETING", "FOCUS", "DESK"]),
        capacity: z.number(),
        floor: z.number(),
        navigationId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await prisma.room.create({
        data: input,
      });
    }),
  get: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    return await prisma.room.findUnique({
      where: {
        id: input,
      },
    });
  }),
  getRooms: publicProcedure.query(async () => {
    return await prisma.room.findMany();
  }),
  getRoomsByTypeAndSize: publicProcedure
    .input(
      z.object({
        type: z.enum(["MEETING", "FOCUS", "DESK"]),

        capacity: z.number(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.room.findMany({
        where: {
          type: input.type,
          capacity: input.capacity,
        },
      });
    }),
  nextAvailable: publicProcedure
    .input(
      z.object({
        type: z.enum(["MEETING", "FOCUS", "DESK"]),
        capacity: z.number(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      const rooms = await prisma.room.findMany({
        where: {
          type: input.type,
          capacity: {
            gte: input.capacity,
          },
          bookings: {
            none: {
              OR: [
                {
                  startTime: {
                    lt: input.endTime,
                  },
                  endTime: {
                    gt: input.startTime,
                  },
                },
              ],
            },
          },
        },
        orderBy: {
          floor: "asc",
        },
      });
      if (rooms.length === 0) {
        console.log("No rooms available");
        return null;
      }
      console.log("GET request:", rooms[0]);
      return rooms[0];
    }),
  RoomsBasedOnRoomType: publicProcedure
    .input(
      z.object({
        type: z.enum(["MEETING", "FOCUS", "DESK"]),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.room.findMany({
        where: {
          type: input.type,
        },
      });
    }),
});

// 1. create a caller-function for your router
export const createCaller = createCallerFactory(roomRouter);
