import { MarketPricesService } from "../services/marketPrices.ts";
import { MarketService } from "../services/markets.ts";
import { CoinService } from "../services/coin.ts";
import { helper } from "../services/helper.ts";
import { CurrencyInformation } from "../types/currencyResponse.ts";
import express, { NextFunction, Router, Request, Response, response } from "express";

export class MarketPricesController {
    private marketPricesService: MarketPricesService;
    private marketService: MarketService;
    private coinService: CoinService;
    private router: Router;
    constructor(marketPricesService: MarketPricesService, marketService: MarketService, coinService: CoinService) {
        this.marketPricesService = marketPricesService;
        this.marketService = marketService;
        this.coinService = coinService;
        this.router = express.Router();
        this.router.get("/cryptocurrency/info", this.onCryptocurrencyInfoGet);
    }

    onCryptocurrencyInfoGet = async (req: Request, res: Response, next: NextFunction) => {
        const marketParameter = req.query.market?.toString() || "all";
        const coinParameter = req.query.symbol?.toString() || "BTC";
        const period = helper.getMinutesFromPeriod(req.query.period?.toString() || "15m");
        const coins = coinParameter.split(",");
        try {
            const promises: Promise<CurrencyInformation>[] = [];
            const userResponse: CurrencyInformation[] = [];
            let market = await this.marketService.selectByName(marketParameter);
            for (const coinCode of coins) {
                const coin = await this.coinService.selectCoinBySymbol(coinCode);
                if (marketParameter === "all") {
                    promises.push(this.marketPricesService.selectAverage(coin[0], "all", period));
                } else if (market !== null) {
                    promises.push(this.marketPricesService.selectAverage(coin[0], market[0], period));
                }
            }
            const response = await Promise.allSettled(promises);
            response.map((item) => {
                if (item.status === "fulfilled") {
                    userResponse.push(item.value);
                }
            });
            if (userResponse.length > 0) {
                res.send(userResponse);
            } else {
                res.sendStatus(404);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    };

    getRouter = () => {
        return this.router;
    };
}
