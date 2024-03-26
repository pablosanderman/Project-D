import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
  helloWorld: publicProcedure.query(async () => {
    return { text: "Hello world!" };
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3020);
