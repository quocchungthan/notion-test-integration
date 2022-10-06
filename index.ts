import { lastModifiedBlockService } from "./src/app/LastModifiedBlock.service";

lastModifiedBlockService.getAll()
    .then(() => {
        lastModifiedBlockService.render();
    });