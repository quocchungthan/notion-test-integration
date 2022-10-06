import { ConfigService } from "./config/Config.service";
import { NotionIntegrationClientService } from "./notionclient/NotionIntegrationClient.service";

var services = [ NotionIntegrationClientService, ConfigService ];
var instances = [];

export function resolveInstanceInex<IService>() {
    for (let i = 0; i < services.length; i ++) {
        console.log(services[i]);
    }

    return -1;
};