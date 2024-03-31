import { router, publicProcedure, createCallerFactory } from "../trpc";
import z from "zod";
import prisma from "@/utils/prisma";

export const bookingRouter = router({
  create: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
        roomId: z.number(),
        status: z.enum(["CANCELLED", "CONFIRMED", "UPCOMING", "ACTIVE"]),
      })
    )
    .mutation((opts) => {
      const { input } = opts;
      return prisma.booking.create({
        data: input,
      });
    }),
});

// 1. create a caller-function for your router
export const createCaller = createCallerFactory(bookingRouter);
