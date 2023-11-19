import { MarketService } from "../services/markets-service.ts"
import express, { NextFunction, Router, Request, Response } from "express";

export class MarketController {
    private marketService: MarketService;
    private router: Router;
    constructor(marketService: MarketService) {
        this.marketService = marketService;
        this.router = express.Router();
        this.router.get("/markets", this.onMarketsGet);
    }

    onMarketsGet = async (req: Request, res: Response, next: NextFunction) => {
        this.marketService.selectAll().then((markets) => {
            res.send(markets);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(502);
        })
    }

    getRoute = () => {
        return this.router;
    }
}