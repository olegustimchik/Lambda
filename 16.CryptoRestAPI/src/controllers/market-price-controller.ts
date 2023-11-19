import { MarketPricesService } from "../services/market-prices-service.ts"
import { MarketService } from "../services/markets-service.ts";
import { CoinService } from "../services/coin-service.ts";
import { getMinutesFromPeriod } from "../validation/crypto-currency-info-router-validation.ts";
import { CurrencyInformation } from "../types/currency-response.ts";
import express, { NextFunction, Router, Request, Response } from "express";

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
        const period = getMinutesFromPeriod(req.query.period?.toString() || "15m");
        const coins = coinParameter.split(",");
        try {
            const promises: Promise<CurrencyInformation>[] = [];
            const userResponse: CurrencyInformation[] = [];
            let market = await this.marketService.selectByName(marketParameter);
            for (const coinCode of coins) {
                const coin = await this.coinService.selectCoinBySymbol(coinCode);
                if (marketParameter === "all") {
                    promises.push(this.marketPricesService.currencyInfo(coin[0], "all", period));
                } else if (market !== null) {
                    promises.push(this.marketPricesService.currencyInfo(coin[0], market[0], period));
                }
            }
            await Promise.allSettled(promises).then((response) => {
                response.map((item) => {
                    console.log(item);
                    if (item.status === "fulfilled") {
                        userResponse.push(item.value);
                    }
                });
                if (userResponse.length > 0) {
                    res.send(userResponse);
                } else {
                    res.sendStatus(204);
                }
            });
        } catch (err) {
            next()
        }
    }

    getRouter = () => {
        return this.router;
    }
}