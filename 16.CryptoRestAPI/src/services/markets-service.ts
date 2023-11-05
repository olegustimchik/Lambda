import { MarketModel } from "../models/models.ts";
import { dbConnection } from "../connection/db.ts";
import { MarketTypeInsert, MarketTypeSelect } from "../types/types.ts";
const marketModel = new MarketModel(dbConnection);

export async function marketsList() {
    const markets = marketModel.selectAll().catch((err) => {
        console.log(err);
        return null;
    });
    return markets;
}