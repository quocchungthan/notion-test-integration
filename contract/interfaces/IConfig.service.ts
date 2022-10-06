export interface IConfigService {
    getToken(): Promise<string>;
    getFirstPageId(): Promise<string>;
}