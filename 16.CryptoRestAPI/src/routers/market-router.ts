import { marketsList } from "../services/markets-service.ts";
import express from "express";
const marketRouter = express.Router();

marketRouter.get("/markets", async (req, res) => {
    marketsList().then((markets) => {
        res.send(markets);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(502);
    })
});


export { marketRouter }; 