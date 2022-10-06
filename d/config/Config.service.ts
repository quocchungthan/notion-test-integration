import { IConfigService } from "@contracts/interfaces/IConfig.service";
import { Config } from "@contracts/models/Config.model";
const fs = require('fs');

class ConfigService implements IConfigService {
    private _fileName = 'config.json';
    private _config?: Config;

    useConfig(fileName: string) {
        console.log('Using config: ' + fileName);
        this._fileName = fileName;
    }

    private getConfig() {
        if (this._config) {
            return this._config;
        }

        let rawdata = fs.readFileSync(this._fileName);
        return this._config = JSON.parse(rawdata) as Config;
    }

    getFirstPageId(): Promise<string> {
        return new Promise<string>((res, rej) => {
            res(this.getConfig().pageIds[0]);
        });
    }

    getFirstPages(): Promise<string[]> {
        return new Promise<string[]>((res, rej) => {
            res(this.getConfig().pageIds);
        });
    }

    getToken(): Promise<string> {
        return new Promise<string>((res, rej) => {
            res(this.getConfig().token);
        });
    }

}

export const configService = new ConfigService() as IConfigService;