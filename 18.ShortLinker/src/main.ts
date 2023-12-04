import express, { Express, Request, Response } from "express";
import { dbConnection } from "./dbConnection/db.ts";
import { ShortenLinkRepository } from "./repositories/shortenLink.ts";
import { ShortenLinkService } from "./services/shortenLinks.ts";
import { ShortenLinkController } from "./controllers/shortenUrl.ts";
import * as dotenv from "dotenv";
import { HelperService } from "./services/helper.ts";
dotenv.config();
const app: Express = express();
const port: string = process.env.PORT || "3000";

const shortenLinkRepo = new ShortenLinkRepository(dbConnection);
const shortenLinkService = new ShortenLinkService(shortenLinkRepo);
const helperService = new HelperService(); 
const controller = new ShortenLinkController(shortenLinkService, helperService);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(`time ${new Date()}`);
    next();
});

app.use(controller.getRouter());

app.use(function (req, res, next) {
    var err: Error = new Error("Not Found");
    next(err);
});

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});
