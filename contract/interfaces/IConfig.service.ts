export interface IConfigService {
    getToken(): Promise<string>;
    getFirstPageId(): Promise<string>;
    getFirstPages(): Promise<string[]>;
    useConfig(fileName: string): void;
}