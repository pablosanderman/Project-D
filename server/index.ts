import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "../trpc";

import { bookingRouter } from "./booking";
import { userRouter } from "./user";
import { roomRouter } from "./room";

const appRouter = router({
  booking: bookingRouter,
  user: userRouter,
  room: roomRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3020);
