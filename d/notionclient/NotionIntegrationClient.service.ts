import { IConfigService } from "@contracts/interfaces/IConfig.service";
import { INotionIntegrationService } from "@contracts/interfaces/INotionIntegrationClient.service";
import { Notion } from "@contracts/models/Block.model";
import { configService } from "../config/Config.service";
import { Client } from "@notionhq/client";
import { ParticalParagraphContent } from "./ParagraphResult.model";
import { ILoggerService } from "@contracts/interfaces/ILogger.service";
import { consoleLogger } from "../../d/core/ConsoleLogger.service";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

class NotionIntegrationClientService implements INotionIntegrationService {

    private _notion?: Client;

    constructor(private _config: IConfigService, private _logger: ILoggerService) {}

    connect(): Promise<void> {
        return this._config.getToken()
            .then(x => {
                this._notion = new Client({
                    auth: x,
                });
            });
    }

    close(): Promise<void> {
        this._notion = undefined;

        return Promise.resolve();
    }

    async getBlocks(): Promise<Notion.Block[]> {
        var pageIds = await this._config.getFirstPages();
        this._logger.info(`Got the page Ids`);
        this._logger.info(pageIds);
        var results = await Promise.all(pageIds.map(x => this.getBlocksByPageId(x)));

        return results.flat();
    }

    getBlocksByPageId(pageId: string): Promise<Notion.Block[]> {
        if(this._notion == undefined) {
            return Promise.reject();
        }

        return this.getChildBlocks(pageId);
    }

    private async getChildBlocks(blockId: string): Promise<Notion.Block[]> {
        if(this._notion == undefined) {
            return Promise.reject();
        }

        var x: ListBlockChildrenResponse;
        try {
            x = await this._notion.blocks.children.list({block_id: blockId});
            this._logger.info('Loaded children of block ' + blockId);

        } catch(e) {
            this._logger.info('Failed to load children of block ' + blockId + ' discarded ');
            this._logger.info(e as object);
            return Promise.resolve([]);
        }

        var results: Notion.Block[] = [];

        for (let y of  x.results) {
            let brief = "";

            (y as ParticalParagraphContent).paragraph?.rich_text.forEach(x => {
                brief += x.plain_text;
            });

            results.push({
                parentId: blockId,
                id: y.id,
                brief,
                lastModified: new Date((y as ParticalParagraphContent).last_edited_time)
            });
        }

        results = results.concat((await Promise.all(x.results.map(y => this.getChildBlocks(y.id)))).flat());

        return results;
    }
}

export const notionIntegrationClientService = new NotionIntegrationClientService(configService, consoleLogger) as INotionIntegrationService;