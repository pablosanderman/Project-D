import { router, publicProcedure, createCallerFactory } from "../trpc";
import z from "zod";
import prisma from "@/utils/prisma";
import { BookingStatus } from "@prisma/client";

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
      return await prisma.booking.create({
        data: input,
      });
    }),
  get: publicProcedure
    .input(
      z.object({
        userId: z.number(),
      })
    )
    .query(async (opts) => {
      const { userId } = opts.input;
      return await prisma.booking.findMany({
        where: {
          userId: userId,
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
