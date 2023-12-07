import { Model } from "mongoose";
import { IUserRouter } from "../models/routerModel.ts";

export class UserRouterRepository {
    private model: Model<IUserRouter>;
    constructor(model: Model<IUserRouter>) {
        this.model = model;
    }

    save = async (routerUrl: string, data: object) => {
        const userRouter = new this.model({ routerUrl, data });
        return await userRouter.save();
    }

    findOne = async (routerUrl: string): Promise<IUserRouter | null> => {
        const userRouter = await this.model.findOne({ routerUrl: routerUrl }).exec();
        return userRouter;
    }

    findOneAndUpdate = async (routerUrl: string, data: object) => {
        const userRouter = await this.model.findOneAndUpdate({ routerUrl: routerUrl }, { data: data }).exec();
        return userRouter;
    }

}