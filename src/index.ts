import { Config } from "./config/config";

Config.services.forEach(async (service) => {
  console.log(JSON.stringify(service));
  console.log(service.getName(), "is up:", await service.check());
});
