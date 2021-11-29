import { Config } from "./config/config";

console.log("Checking every service...");
Promise.all(Config.services.map((service) => service.check())).then((values) =>
  console.log("All services up:", values.every(Boolean))
);
