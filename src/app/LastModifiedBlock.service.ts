import { ILoggerService } from "@contracts/interfaces/ILogger.service";
import { INotionIntegrationService } from "@contracts/interfaces/INotionIntegrationClient.service";
import { Notion } from "@contracts/models/Block.model";
import { consoleLogger } from "../../d/core/ConsoleLogger.service";
import { notionIntegrationClientService } from "../../d/notionclient/NotionIntegrationClient.service";

class LastModifiedBlockService {
    private _data: Notion.Block[] = [];
    private _maxLength = 50;

    constructor(private _notionService: INotionIntegrationService, private _logger: ILoggerService){ }

    getAll(): Promise<void> {
        return this._notionService.connect()
            .then(() => this._notionService.getBlocks())
            .finally(() => {
                this._notionService.close();
            })
            .then((result) => {
                this._data = result
                    .sort((x, y) => x.lastModified.getTime() - y.lastModified.getTime())
                    .filter(x => x.brief.length > 0)
                    .map(x => {
                        if (x.brief.length > this._maxLength) {
                            x.brief = x.brief.substring(0, this._maxLength - 3) + '...';
                        }

                        return x;
                    });
            });
    }

    render(): void {
        this._logger.info("Done");
        this._logger.table(this._data.map(x => ({brief: x.brief, lastModified: x.lastModified, parent: x.parentId})));
    }
}


export const lastModifiedBlockService = new LastModifiedBlockService(notionIntegrationClientService, consoleLogger);