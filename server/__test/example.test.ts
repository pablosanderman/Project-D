import { test, expect } from "@jest/globals";
import { inferProcedureInput } from "@trpc/server";

import { exampleRouter, createCaller } from "../example";

test("greeting", async () => {
  const caller = createCaller({});

  const result = await caller.greeting();

  expect(result).toBe("hello tRPC v11!");
});
