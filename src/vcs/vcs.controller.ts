import {Controller, Get, Query} from '@nestjs/common';
import {VcsService} from "./vcs.service";
import {Params as QueryParams} from "./types";

@Controller('/api/vcs')
export class VcsController {

    constructor(private service: VcsService) {}

    @Get('/search/repositories')
    search(@Query() query: QueryParams) {
        const { language, top, created, page = 1, per_page = 10 } = query
        return this.service.search(
            { language, top, created },
            {page, per_page}
        )
    }


}
