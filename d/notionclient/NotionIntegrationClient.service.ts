import { IConfigService } from "@contracts/interfaces/IConfig.service";
import { INotionIntegrationService } from "@contracts/interfaces/INotionIntegrationClient.service";
import { Notion } from "@contracts/models/Block.model";
import { configService } from "../config/Config.service";
import { Client } from "@notionhq/client";
import { ParagraphResult, ParticalParagraphContent } from "./ParagraphResult.model";

class NotionIntegrationClientService implements INotionIntegrationService {

    private _notion?: Client;

    constructor(private _config: IConfigService) {}

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

    getBlocks(): Promise<Notion.Block[]> {
        return Promise.resolve([]);
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

export const notionIntegrationClientService = new NotionIntegrationClientService(configService) as INotionIntegrationService;