import { UserRouterRepository } from "../repositories/userRouter.ts";

export class UserRouterService {
    private repository: UserRouterRepository;
    constructor(repository: UserRouterRepository) {
        this.repository = repository;
    }
    save = async (routerUrl: string, data: object) => {
        return this.repository.save(routerUrl, data);
    }

    findOne = async (routerUrl: string) => {
        return this.repository.findOne(routerUrl);
    }

    findOneAndUpdate = async (routerUrl: string, data: object) => {
        return this.repository.findOneAndUpdate(routerUrl, data);
    }

}