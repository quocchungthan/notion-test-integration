import { IConfigService } from "@contracts/interfaces/IConfig.service";
import { Config } from "@contracts/models/Config.model";
const fs = require('fs');

class ConfigService implements IConfigService {
    getFirstPageId(): Promise<string> {
        return new Promise<string>((res, rej) => {
            let rawdata = fs.readFileSync('config.json');
            let config = JSON.parse(rawdata) as Config;
    
            res(config.pageIds[0]);
        });
    }

    getToken(): Promise<string> {
        return new Promise<string>((res, rej) => {
            let rawdata = fs.readFileSync('config.json');
            let config = JSON.parse(rawdata) as Config;
    
            res(config.token);
        });
    }

}

export const configService = new ConfigService() as IConfigService;