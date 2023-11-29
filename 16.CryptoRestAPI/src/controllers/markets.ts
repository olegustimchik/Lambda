import { MarketService } from "../services/markets.ts";
import express, { NextFunction, Router, Request, Response } from "express";

export class MarketController {
    private marketService: MarketService;
    private router: Router;
    constructor(marketService: MarketService) {
        this.marketService = marketService;
        this.router = express.Router();
        this.router.get("/markets", this.onGetAllMarkets);
    }

    onGetAllMarkets = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const markets = await this.marketService.selectAll();
            if (markets) {
                res.send(markets);
            } else {
                res.status(500).json({ message: "Something went wrong, try again" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    };

    getRoute = () => {
        return this.router;
    };
}
