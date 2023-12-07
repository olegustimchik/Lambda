import mongoose, { Schema, connect, Types, Model, Mixed, model } from "mongoose";

interface IUserRouter {
    routerUrl: string;
    data: Object;
}
// const connection = await connect(process.env.MONGODB_URL, { socketTimeoutMS: 500, dbName: "routers" });
const schema = new Schema<IUserRouter>({ routerUrl: { type: String }, data: { type: Object } });
const routerModel = model<IUserRouter>("routers", schema);
export { routerModel, IUserRouter, schema };


