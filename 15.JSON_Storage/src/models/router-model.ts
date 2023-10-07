import mongoose, { Schema, connect, Types, Model, Mixed, model } from "mongoose";
import IUserRouter from "../interfaces/user-router-interface.ts";

// const connection = await connect(process.env.MONGODB_URL, { socketTimeoutMS: 500, dbName: "routers" });

export default class RouterModel {
    private schema: Schema;
    private model: Model<IUserRouter>;
    constructor() {
        this.schema = new Schema<IUserRouter>({
            routerUrl: { type: String },
            data: { type: Object }
        });
        this.model = model<IUserRouter>("routers", this.schema);
    }

    async save(routerUrl: string, data: object) {
        await connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017", { socketTimeoutMS: 500, dbName: "json_base" }).catch((err) => {
            throw new Error(err);
        });
        const userRouter = new this.model({ routerUrl, data });
        await userRouter.save().catch((err) => { throw new Error(err); });
    }

    async findOne(routerUrl: string, data: object): Promise<IUserRouter | null> {
        await connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017", { socketTimeoutMS: 500, dbName: "json_base" }).catch((err) => {
            throw new Error(err);
        });
        const userRouter = await this.model.findOne({ routerUrl: routerUrl }).exec();
        return userRouter; 
    }

    async findOneAndUpdate(routerUrl: string, data: object): Promise<boolean> {
        await connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017", { socketTimeoutMS: 500, dbName: "json_base" }).catch((err) => {
            throw new Error(err);
        });
        const userRouter = await this.model.findOneAndUpdate({ routerUrl: routerUrl }, { data: data}).exec();
        return userRouter != null;
    }


}


