import { Notion } from "@contracts/models/Block.model";

export interface INotionIntegrationService {
    connect(): Promise<void>;
    close(): Promise<void>;
    getBlocks(): Promise<Array<Notion.Block>>;
    getBlocksByPageId(pageId: string): Promise<Array<Notion.Block>>;
}