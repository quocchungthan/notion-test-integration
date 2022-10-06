import { ILoggerService } from "@contracts/interfaces/ILogger.service";

class ConsoleLoggerService implements ILoggerService {
    table(data: any[]): void {
        if (!data.length) {
            return;
        }

        //var headers = Object.keys(data[0]);
        console.table(data);
    }

    info(message: string | object): void {
        let msg = message;
        if (typeof(message) === 'object') {
            msg = JSON.stringify(message);
        }

        console.log(`${Date.now()} : ${msg}`);
    }
    
}

export const consoleLogger = new ConsoleLoggerService() as ILoggerService;