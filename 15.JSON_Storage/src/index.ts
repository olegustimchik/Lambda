import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from 'express';
import userRouter from "./routers/user-router.ts";

const app: Express = express();
const port: string = process.env.PORT || "3000";

app.use(express.json({ "limit": "100kb" }));
app.use(express.urlencoded({ "extended": false }));
app.use((req, res, next) => {
    console.log(`time ${new Date()}`);
    next();
});

app.use(userRouter);
app.use(function (req, res, next) {
    var err: Error = new Error('Not Found');
    next(err);
});

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
}); 