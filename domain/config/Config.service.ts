import { IConfigService } from "@contracts/interfaces/IConfig.service"

export class ConfigService implements IConfigService {

    getToken(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}