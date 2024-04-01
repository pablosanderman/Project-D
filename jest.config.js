module.exports = {
  clearMocks: true,
  preset: "jest-expo",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./utils/singleton.ts"],
};
