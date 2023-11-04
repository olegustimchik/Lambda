import { coinsList } from "../services/coins-service.ts";
import express from "express";
const coinRouter = express.Router();

coinRouter.get("/coin-list", (req, res, next) => {
    coinsList().then((coins) => {
        res.send(coins);
    }).catch((err) => {
        res.sendStatus(400);
    });
});

export { coinRouter }; 