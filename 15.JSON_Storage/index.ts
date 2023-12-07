import * as dotenv from "dotenv";
dotenv.config();
import mongoose, { Schema, connect, Types, Model, Mixed, model } from "mongoose";
import express, { Express, Request, Response } from 'express';
import { UserRouterRepository } from "./src/repositories/userRouter.ts";
import { UserRouterService } from "./src/services/userRouter.ts";
import { UserRouterController } from "./src/controllers/userRouterController.ts";
import { routerModel } from "./src/models/routerModel.ts";

const userRouterRepository = new UserRouterRepository(routerModel);
const userRouterService = new UserRouterService(userRouterRepository);
const userRouterController = new UserRouterController(userRouterService);


const app: Express = express();
const port: string = process.env.PORT || "3000";
app.use(express.json({ "limit": "100kb" }));
app.use(express.urlencoded({ "extended": false }));
app.use((req, res, next) => {
    console.log(`time ${new Date()}`);
    next();
});

app.use(userRouterController.getRouter());
app.use(function (req, res, next) {
    var err: Error = new Error('Not Found');
    next(err);
});
try {
    const server = app.listen(port, async () => {
        await connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017", { socketTimeoutMS: 500, dbName: "json_base" });
        console.log(`Express listening on port ${port}`);
    });
} catch (err) {
    console.log(err);
}