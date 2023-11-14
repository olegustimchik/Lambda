import express, { Express, Request, Response } from "express";
import { dbConnection } from "./dbConnection/db.ts";
import { ShortenLinkRepository } from "./repositories/shorten-link-repo.ts";
import { ShortenLinkService } from "./services/shorten-links-service.ts";
import { ShortenLinkController } from "./controllers/shorten-url-controller.ts";
import * as dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const port: string = process.env.PORT || "3000";

const shortenLinkRepo = new ShortenLinkRepository(dbConnection);
const shortenLinkService = new ShortenLinkService(shortenLinkRepo);
const controller = new ShortenLinkController(shortenLinkService);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(`time ${new Date()}`);
    next();
});

app.use(controller.getRouter());
app.get("/", (req, res, next) => {
    const date = new Date();
    let dateString = date.toISOString();
    dateString = dateString.replace("T", " ");
    dateString = dateString.replace("Z", "");
    console.log(dateString);
});
app.use(function (req, res, next) {
    var err: Error = new Error("Not Found");
    next(err);
});

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});
