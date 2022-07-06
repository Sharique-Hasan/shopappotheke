import {GithubFilterInterface} from "../interfaces/github-filter.interface";
import {PaginationInterface} from "../interfaces/pagination.interface";

export type Params = Partial<GithubFilterInterface & PaginationInterface>
