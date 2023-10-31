import express from "express";
import { MarketModel } from "../models/models.ts";
import { dbConnection } from "../connection/db.ts";

import { MarketTypeInsert, MarketTypeSelect } from "../types/types.ts";
const marketRouter = express.Router();
const marketModel = new MarketModel(dbConnection);

marketRouter.get("/markets", async (req, res) => {
    
});


export { marketRouter }; 