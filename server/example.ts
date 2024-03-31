import { publicProcedure, router, createCallerFactory } from "../trpc";

export const exampleRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v11!"),
});

// 1. create a caller-function for your router
export const createCaller = createCallerFactory(exampleRouter);
