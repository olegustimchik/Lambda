import express from "express";
import { getMinutesFromPeriod } from "../validation/crypto-currency-info-router-validation.ts";
import { currencyInfo } from "../services/cryptocurrency-info-sercive.ts";
const cryptocurrencyInfoRouter = express.Router();

// params market(CoinBase,CoinMarketCap,CoinPaprika,CoinStats,Kucoin), symbol(BTC, BNB...), period(15m, 1h, 4h, 24h)
cryptocurrencyInfoRouter.get("/cryptocurrency/info", async (req, res, next) => {
    const market = req.query.market?.toString() || "all";
    const coin = req.query.symbol?.toString() || "BTC";
    const period = getMinutesFromPeriod(req.query.period?.toString() || "15m");
    try {
        await currencyInfo(coin, market, period).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(400).send({ message: "wrong parameters" });
        });
    } catch (err) {
       next()
    }
});

export { cryptocurrencyInfoRouter }; 