export interface IConfigService {
    getToken(): Promise<string>;
}