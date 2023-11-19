import { coinCodes } from "../markets/cryptocurrencies.ts";
import { CoinService } from "../services/coin-service.ts";
import express, { NextFunction, Router, Request, Response } from "express";

export class CoinController {
    private coinService: CoinService;
    private router: Router;
    constructor(coinService: CoinService) {
        this.coinService = coinService;
        this.router = express.Router();
        this.router.get("/coins", this.onCoinsGet);
        this.router.post("/save", this.onPostSave);
    }

    onCoinsGet = async (req: Request, res: Response, next: NextFunction) => {
        const coin = req.query.coin?.toString();
        console.log(coin);
        if (coin === undefined) {
            this.coinService.selectAll().then((data) => {
                res.send(data);
            })
        } else {
            this.coinService.selectCoinBySymbol(coin).then((coins) => {
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
    }

    onPostSave = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.coinService.saveManyCoins(coinCodes);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            next();
        }
    }

    getRouter = () => {
        return this.router;
    }
} 