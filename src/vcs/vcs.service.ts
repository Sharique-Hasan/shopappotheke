import { Injectable } from '@nestjs/common';
import {GithubapiService} from "./githubapi/githubapi.service";
import {GithubFilterInterface} from "./interfaces/github-filter.interface";
import {PaginationInterface} from "./interfaces/pagination.interface";

@Injectable()
export class VcsService {

    constructor(private github: GithubapiService) {}

    search(filter: GithubFilterInterface, pagination: PaginationInterface) {
        return this.github.fetchRepositories(filter, pagination)
    }

}
