import express, { Express, Request, Response } from 'express';
import { coinRouter } from "./src/routers/coin-router.js"
import { marketRouter } from "./src/routers/market-router.js";
import { saveRouter } from "./src/routers/save.js";
import { cryptocurrencyInfoRouter } from "./src/routers/cryptocurrency-info-router.js";
import { cronJob } from "./src/cronFold/job.js"
import * as dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const port: string = process.env.PORT || "3000";

cronJob.start();
app.use(express.json({ "limit": "100kb" }));
app.use(express.urlencoded({ "extended": false }));
app.use((req, res, next) => {
    console.log(`time ${new Date()}`);
    next();
});

app.use(cryptocurrencyInfoRouter); 
app.use(marketRouter);
app.use(coinRouter);
app.use(saveRouter);
app.get("/", (req, res, next) => {
    const date = new Date();
    let dateString = date.toISOString();
    dateString = dateString.replace("T", " ");
    dateString = dateString.replace("Z", "");
    console.log(dateString);


});
app.use(function (req, res, next) {
    var err: Error = new Error('Not Found');
    next(err);
});

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
}); 