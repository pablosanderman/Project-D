import { router, publicProcedure, createCallerFactory } from "../trpc";
import z from "zod";
import prisma from "@/utils/prisma";

export const roomRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.enum(["MEETING", "FOCUS", "DESK"]),
        size: z.enum([
          "ONE_TO_TWO",
          "TWO_TO_FOUR",
          "FOUR_TO_EIGHT",
          "EIGHT_TO_SIXTEEN",
        ]),
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
        size: z.enum([
          "ONE_TO_TWO",
          "TWO_TO_FOUR",
          "FOUR_TO_EIGHT",
          "EIGHT_TO_SIXTEEN",
        ]),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.room.findMany({
        where: {
          type: input.type,
          size: input.size,
        },
      });
    }),
});

// 1. create a caller-function for your router
export const createCaller = createCallerFactory(roomRouter);
