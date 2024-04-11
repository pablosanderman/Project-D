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

  const result = await caller.create(input);

  const bookingInfo = await caller.get(1);

  expect(bookingInfo).toMatchObject(result);
});
