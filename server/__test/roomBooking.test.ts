import { test, expect } from "@jest/globals";
import { inferProcedureInput } from "@trpc/server";
// import prisma from "@/utils/prisma";

import { bookingRouter, createCaller } from "../booking";

test("add booking", async () => {
  const caller = createCaller({});

  const input: inferProcedureInput<typeof bookingRouter.create> = {
    userId: 1,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    roomId: 1,
    status: "UPCOMING",
  };

  const result = caller.create(input);

  expect(result).toMatchObject(input);

  // const bookings = await prisma.booking.findMany();

  // expect(bookings).toHaveLength(1);
  // expect(bookings[0]).toMatchObject(input);
});
