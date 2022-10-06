import { configService } from "./d/config/Config.service";
import { lastModifiedBlockService } from "./src/app/LastModifiedBlock.service";

var index = process.argv.indexOf('--config');

if (index >= 0) {
    configService.useConfig(process.argv[index + 1]);
}

lastModifiedBlockService.getAll()
    .then(() => {
        lastModifiedBlockService.render();
    });