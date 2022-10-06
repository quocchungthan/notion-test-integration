import { IConfigService } from "@contracts/interfaces/IConfig.service";
import { INotionIntegrationService } from "@contracts/interfaces/INotionIntegrationClient.service";
import { Notion } from "@contracts/models/Block.model";
import { configService } from "../config/Config.service";
import { Client } from "@notionhq/client";
import { ParticalParagraphContent } from "./ParagraphResult.model";
import { ILoggerService } from "@contracts/interfaces/ILogger.service";
import { consoleLogger } from "../../d/core/ConsoleLogger.service";

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

        var x = await this._notion.blocks.children.list({block_id: blockId});
        var results: Notion.Block[] = [];

        this._logger.info('Loaded children of block ' + blockId);
        this._logger.info(x);

        for (let y of  x?.results) {
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

            results = results.concat(await this.getChildBlocks(y.id));
        }

        return results;
    }
}

export const notionIntegrationClientService = new NotionIntegrationClientService(configService, consoleLogger) as INotionIntegrationService;