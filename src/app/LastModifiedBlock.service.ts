import { ILoggerService } from "@contracts/interfaces/ILogger.service";
import { INotionIntegrationService } from "@contracts/interfaces/INotionIntegrationClient.service";
import { Notion } from "@contracts/models/Block.model";
import { consoleLogger } from "../../d/core/ConsoleLogger.service";
import { notionIntegrationClientService } from "../../d/notionclient/NotionIntegrationClient.service";

class LastModifiedBlockService {
    private _data: Notion.Block[] = [];

    constructor(private _notionService: INotionIntegrationService, private _logger: ILoggerService){ }

    getAll(): Promise<void> {
        return this._notionService.connect()
            .then(() => this._notionService.getBlocks())
            .finally(() => {
                this._notionService.close();
            })
            .then((result) => {
                this._data = result.sort((x, y) => x.lastModified.getTime() - y.lastModified.getTime());
            });
    }

    render(): void {
        this._logger.info("Done");
        this._logger.table(this._data);
    }
}


export const lastModifiedBlockService = new LastModifiedBlockService(notionIntegrationClientService, consoleLogger);