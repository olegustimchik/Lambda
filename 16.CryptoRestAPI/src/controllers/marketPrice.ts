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
        this.router.get("/getRatesByMarket", this.getRatesByMarket);
        this.router.get("/getRatesByAllMarkets", this.getPriceAllMarkets);

    }

    getPriceAllMarkets = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const coinParameter = req.query.coins?.toString();
            const period = helper.getMinutesFromPeriod(req.query.period?.toString() || "15m");
            if (!coinParameter) {
                return res.status(400).json({ message: "Missing 'coins' parameter" });
            }
            const userResponse = await this.marketPricesService.averagePriceJoinCoins(coinParameter.split(","), period);
            if (!userResponse) {
                return res.status(400).json({ "message": "Don't have this coins in database" });
            } else {
                return res.send(userResponse);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong, try again" });
        }

    }

    getRatesByMarket = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const marketParameter = req.query.market?.toString();
            const coinParameter = req.query.coins?.toString();
            const period = helper.getMinutesFromPeriod(req.query.period?.toString() || "15m");
            if (!coinParameter || !marketParameter) {
                return res.status(400).json({ message: "Missing 'coins' or 'market' parameter" });
            }
            const coins = coinParameter.split(",");
            let market = (await this.marketService.selectByName(marketParameter))[0];
            if (!market){ 
                return res.status(400).json({ message: "Market not found"}); 
            }
            const rates = await this.marketPricesService.averagePriceByMarketJoinCoins(market.id, coins, period); 
            if (!rates || rates.length < 0 ) { 
                return res.status(400).json({ "message": "Don't have this coins in database" });
            } else { 
                return res.send(rates); 
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
