import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "../trpc";

import { bookingRouter } from "./booking";

const AppRouter = router({
  booking: bookingRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof AppRouter;

const server = createHTTPServer({
  router: AppRouter,
});

server.listen(3020);

// korbin example

// helloWorld: publicProcedure.query(async () => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: 1,
//     },
//   });
//   return { text: "Hello " + user?.name };
