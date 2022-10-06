import { IConfigService } from "@contracts/interfaces/IConfig.service";
import { INotionIntegrationService } from "@contracts/interfaces/INotionIntegrationClient.service";
import { Notion } from "@contracts/models/Block.model";
import { configService } from "../../d/config/Config.service";
import { notionIntegrationClientService } from "../../d/notionclient/NotionIntegrationClient.service";

class LastModifiedBlockService {
    private _data: Notion.Block[] = [];

    constructor(private _notionService: INotionIntegrationService, private _config: IConfigService){ }

    getAll(): Promise<void> {
        return this._notionService.connect()
            .then(() => this._config.getFirstPageId())
            .then((id) => this._notionService.getBlocksByPageId(id))
            .finally(() => {
                this._notionService.close();
            })
            .then((result) => {
                this._data = result.sort((x, y) => x.lastModified.getTime() - y.lastModified.getTime());
            });
    }

    render(): void {
        console.log(this._data);
    }
}


export const lastModifiedBlockService = new LastModifiedBlockService(notionIntegrationClientService, configService);