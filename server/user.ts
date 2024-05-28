import { router, publicProcedure, createCallerFactory } from "../trpc";
import z from "zod";
import prisma from "@/utils/prisma";

export const userRouter = router({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await prisma.user.create({
        data: input,
      });
    }),
  get: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    return await prisma.user.findUnique({
      where: {
        id: input,
      },
    });
  }),
  getUserBookings: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const user = await prisma.user.findUnique({
      where: {
        id: input,
      },
      include: {
        bookings: true,
      },
    });
    return user?.bookings;
  }),
});

// 1. create a caller-function for your router
export const createCaller = createCallerFactory(userRouter);
