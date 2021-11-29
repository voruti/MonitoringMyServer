import { Config } from "./config/config";

const services = Config.getServices();
services.forEach(async (service) => {
  console.log(JSON.stringify(service));
  console.log(service.getName(), "is up:", await service.check());
});
