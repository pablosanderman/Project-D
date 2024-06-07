import { test, expect } from "@jest/globals";
import { inferProcedureInput } from "@trpc/server";
import { bookingRouter, createCaller } from "../booking";

test("create booking", async () => {
  const caller = createCaller({});

  const input: inferProcedureInput<typeof bookingRouter.create> = {
    userId: 1,
    startTime: new Date("3000-01-01T13:00:00Z").toISOString(),
    endTime: new Date("3000-01-01T14:00:00Z").toISOString(),
    roomId: 1,
    status: "UPCOMING",
  };

  const result = (await caller.create(input))[0];

  const bookingInfo = await caller.getById({ id: result.id });

  expect(bookingInfo).toMatchObject(result);
});

test("2 people booking the same room", async () => {
  const caller = createCaller({});

  const input: inferProcedureInput<typeof bookingRouter.create> = {
    userId: 1,
    startTime: new Date("3000-01-01T13:00:00Z").toISOString(),
    endTime: new Date("3000-01-01T14:00:00Z").toISOString(),
    roomId: 1,
    status: "UPCOMING",
  };

  await caller.create(input);

  const input2: inferProcedureInput<typeof bookingRouter.create> = {
    userId: 2,
    startTime: new Date("3000-01-01T13:00:00Z").toISOString(),
    endTime: new Date("3000-01-01T14:00:00Z").toISOString(),
    roomId: 1,
    status: "UPCOMING",
  };

  await expect(caller.create(input2)).rejects.toThrowError();
});

test("it shouldn't be possible to make past booking", async () => {
  const caller = createCaller({});

  const input: inferProcedureInput<typeof bookingRouter.create> = {
    userId: 1,
    startTime: new Date("2020-01-01T13:00:00Z").toISOString(),
    endTime: new Date("2020-01-01T14:00:00Z").toISOString(),
    roomId: 1,
    status: "UPCOMING",
  };

  await expect(caller.create(input)).rejects.toThrowError();
});
