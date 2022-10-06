import { IConfigService } from "@contracts/interfaces/IConfig.service";
import { INotionIntegrationService } from "@contracts/interfaces/INotionIntegrationClient.service";

export class NotionIntegrationClientService implements INotionIntegrationService {

    constructor(private _config: IConfigService) {}

    connect(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    close(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getBlocks(): Promise<Notion.Block[]> {
        throw new Error("Method not implemented.");
    }
    getBlocksByPageId(pageId: string): Promise<Notion.Block[]> {
        throw new Error("Method not implemented.");
    }

}