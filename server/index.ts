import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc";
import prisma from "@/utils/prisma";

const appRouter = router({
  helloWorld: publicProcedure.query(async () => {
    const user = await prisma.user.findUnique({
      where: {
        id: 1,
      },
    });
    return { text: "Hello " + user?.name };
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3020);
