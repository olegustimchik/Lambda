import { coinsList, coinBySymbol } from "../services/coins-service.ts";
import express from "express";
const coinRouter = express.Router();

coinRouter.get("/coins", (req, res, next) => {
    const coin = req.query.coin?.toString();
    if (coin === undefined) {
        coinsList().then((coins) => {
            res.send(coins);
        }).catch((err) => {
            console.log(err); 
            res.sendStatus(502);
        });
    } else {
        coinBySymbol(coin).then((coins) => {
            if (coins.length < 1) { 
                res.sendStatus(204);
            } else {
                res.send(coins);
            }
        }).catch((err) => {
            console.log(err); 
            res.sendStatus(502);
        });
    }
});

export { coinRouter }; 