import {BadRequestException, Injectable} from '@nestjs/common';
import {GithubFilterInterface} from "../interfaces/github-filter.interface";
import axios from 'axios'
import {PaginationInterface} from "../interfaces/pagination.interface";
import {Params} from "../types";

@Injectable()
export class GithubapiService {
    #baseUrl: string;
    constructor() {
        this.#baseUrl = process.env.GITHUB_BASE_URL;
    }

    get #instance() {
        return axios.create({
            baseURL: this.#baseUrl,
            headers: {
                'Accept': 'application/vnd.github+json'
            }
        })
    }

    async fetchRepositories(filter: GithubFilterInterface, pagination: PaginationInterface = { page: 1, per_page: 10 }) {
        const params: Params = {...pagination, sort: 'stars', order: 'desc'}
        let q = [];
        if (filter.top && ['10', '50', '100'].includes(`${filter.top}`)) {
            params.page = 1;
            pagination.page = 1;
            params.per_page = filter.top
            pagination.per_page = filter.top
        }
        if (filter.created) {
            q.push((`created:>${filter.created}`))
        }
        if (filter.language) {
            q.push((`language:${filter.language}`))
        }
        if (filter.language && filter.language) {
            q = []
            q.push(filter.language)
            q.push((`created:>${filter.created}`))
        }


        let response;
        try {
            response = await this.#instance.get('/search/repositories', {
                params: {
                    q: q.length ? q.join('+') : 'license:mit',
                    ...params
                }
            }).then(response => response.data)
        }
        catch (e) {
            throw new BadRequestException(e.message);
        }

        return {
            total_pages: Math.ceil(response.total_count/pagination.per_page),
            page: pagination.page,
            per_page: +pagination.per_page,
            items: response.items
        }
    }
}
