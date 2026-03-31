/** @type {import("@remix-run/dev").AppConfig} */
export default {
  appDirectory: "app",
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  server: process.env.NODE_ENV === "production" ? "./server.ts" : undefined,

};
