import config from "config";
import {Service} from "./model/service";

if (config.has("services")) {
    const services = config.get<Service[]>("services");

    services.forEach((service) => console.log(JSON.stringify(service)));
}
