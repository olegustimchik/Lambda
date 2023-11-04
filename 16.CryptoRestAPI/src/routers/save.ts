import { coinCodes } from "../markets/cryptocurrencies.ts";
import { saveCoinsService } from "../services/save-coins-service.ts";
import express from "express";
const saveRouter = express.Router();

saveRouter.get("/save", (reg, res, next) => {
    try {
        saveCoinsService(coinCodes);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        next();
    }
});

export { saveRouter }; 