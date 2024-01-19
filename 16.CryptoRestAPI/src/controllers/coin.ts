import { coinCodes } from "../markets/cryptocurrencies.ts";
import { CoinService } from "../services/coin.ts";
import express, { NextFunction, Router, Request, Response } from "express";

export class CoinController {
    private coinService: CoinService;
    private router: Router;
    constructor(coinService: CoinService) {
        this.coinService = coinService;
        this.router = express.Router();
        this.router.get("/coins", this.getAll);
        this.router.get("/coin", this.getCoin);
        this.router.post("/save", this.post);
    }
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.coinService.selectAll();
            return res.send(data);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500).json({ message: "Something went wrong, try again" });
        }
    };

    getCoin = async (req: Request, res: Response, next: NextFunction) => {
        const coin = req.query.coin?.toString();
        try {
            if (!coin) {
                return res.status(400).json({ message: "Missing coin" });
            }
            const coins = await this.coinService.selectCoinBySymbol(coin);
            if (!coins || coins.length < 1) {
                return res.status(404).json({ message: "Coin not found" });
            } else {
                return res.send(coins);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    };

    post = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.coinService.saveManyCoins(coinCodes);
            return res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500).json({ message: "Something went wrong, try again" });
        }
    };

    getRouter = () => {
        return this.router;
    };
}
