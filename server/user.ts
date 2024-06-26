import prisma from "@/utils/prisma";
import z from "zod";
import { createCallerFactory, publicProcedure, router } from "../trpc";

export const userRouter = router({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string(),
        surname: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await prisma.user.create({
        data: input,
      });
    }),
  doesUserExist: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        surname: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return (
        (await prisma.user.findFirst({
          where: {
            email: input.email,
            name: input.name,
            surname: input.surname,
          },
        })) !== undefined
      );
    }),
  get: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    return await prisma.user.findUnique({
      where: {
        id: input,
      },
    });
  }),
  logIn: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.user.findFirst({
        where: {
          email: input.email,
          password: input.password,
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
