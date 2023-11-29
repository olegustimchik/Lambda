import { coinCodes } from "../markets/cryptocurrencies.ts";
import { CoinService } from "../services/coin.ts";
import express, { NextFunction, Router, Request, Response } from "express";

export class CoinController {
    private coinService: CoinService;
    private router: Router;
    constructor(coinService: CoinService) {
        this.coinService = coinService;
        this.router = express.Router();
        this.router.get("/coins", this.onCoinsGetAll);
        this.router.get("/coin", this.onCoinGet);
        this.router.post("/save", this.onPostSave);
    }
    onCoinsGetAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.coinService.selectAll();
            res.send(data);
        } catch (err) {
            console.log(err);
            res.sendStatus(500).json({ message: "Something went wrong, try again" });
        }
    };

    onCoinGet = async (req: Request, res: Response, next: NextFunction) => {
        const coin = req.query.coin?.toString();
        try {
            if (!coin) {
                res.status(400).json({ message: "Missing coin" });
                return;
            }
            const coins = await this.coinService.selectCoinBySymbol(coin as string);
            if (!coins || coins.length < 1) {
                res.status(404).json({ message: "Coin not found" });
            } else {
                res.send(coins);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    };

    onPostSave = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.coinService.saveManyCoins(coinCodes);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500).json({ message: "Something went wrong, try again" });
        }
    };

    getRouter = () => {
        return this.router;
    };
}
