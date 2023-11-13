import express from "express";
import { getMinutesFromPeriod } from "../validation/crypto-currency-info-router-validation.ts";
import { currencyInfo } from "../services/cryptocurrency-info-sercive.ts";
import { CurrencyInformation } from "../types/currency-response.ts";
const cryptocurrencyInfoRouter = express.Router();

// params market(CoinBase,CoinMarketCap,CoinPaprika,CoinStats,Kucoin), symbol(BTC, BNB...), period(15m, 1h, 4h, 24h)
cryptocurrencyInfoRouter.get("/cryptocurrency/info", async (req, res, next) => {
    const market = req.query.market?.toString() || "all";
    const coin = req.query.symbol?.toString() || "BTC";
    const period = getMinutesFromPeriod(req.query.period?.toString() || "15m");
    const coins = coin.split(",");
    try {
        const promises: Promise<CurrencyInformation>[] = [];
        const userResponse: CurrencyInformation[] = [];
        coins.forEach(async (coinCode) => {
            promises.push(currencyInfo(coinCode, market, period));
        });
        await Promise.allSettled(promises).then((response) => {
            response.map((item) => {
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
});

export { cryptocurrencyInfoRouter }; 