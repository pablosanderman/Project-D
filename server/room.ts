import { router, publicProcedure, createCallerFactory } from "../trpc";
import z from "zod";
import prisma from "@/utils/prisma";

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
});

// 1. create a caller-function for your router
export const createCaller = createCallerFactory(roomRouter);
