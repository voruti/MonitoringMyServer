import { Config } from "./config/config.js";

console.log("Checking every service...");
Promise.all(
  Config.services.map((service) => {
    const promise = service.check();
    promise.then((result) => console.log(service.getName(), "up:", result));
    return promise;
  })
).then((values) =>
  console.log("===========", "\nAll services up:", values.every(Boolean))
);
