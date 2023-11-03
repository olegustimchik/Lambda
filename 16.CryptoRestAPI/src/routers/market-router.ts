import express from "express";
import { MarketModel } from "../models/models.ts";
import { dbConnection } from "../connection/db.ts";
import { MarketFactory } from "../markets/market-factory.ts";
import { MarketTypeInsert, MarketTypeSelect } from "../types/types.ts";
const marketRouter = express.Router();
const marketModel = new MarketModel(dbConnection);
const market = new MarketFactory();
marketRouter.get("/markets", async (req, res) => {
    market.getCoinStats().getData().then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    });
});


export { marketRouter }; 