import { Config } from "./config/config";

// async function logic(): Promise<void> {
for (const service of Config.services) {
  console.log(JSON.stringify(service));
  // console.log(service.getName(), "is up:", await service.check());
  service
    .check()
    .then((result) => console.log(service.getName(), "is up:", result));
}
// }

// logic().then(() => console.log("Fin"));
