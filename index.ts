import { INotionIntegrationService } from "@contracts/interfaces/INotionIntegrationClient.service";
import { resolveInstanceInex } from "@domain/bootstrapping";

console.log(resolveInstanceInex<INotionIntegrationService>());