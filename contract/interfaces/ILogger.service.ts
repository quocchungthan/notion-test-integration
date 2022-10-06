export interface ILoggerService {
    info(message: string | object): void;
    table(data: any[]): void;
}