import { marketPrices } from "../schemas/schema.ts";
import { MarketPriceTypeInsert, MarketPriceTypeSelect } from "../types/types.ts";
import type { MySql2Database, MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { eq, and } from "drizzle-orm";

export class MarketPricesModel {
    private dbConnection: MySql2Database;
    constructor(dbConnection: MySql2Database) {
        this.dbConnection = dbConnection;
    }

    async insert(marketPrice: MarketPriceTypeInsert): Promise<void | MySqlRawQueryResult>{
        return this.dbConnection.insert(marketPrices).values(marketPrice);
    }

    async selectAll(): Promise<MarketPriceTypeSelect[]> {
        return this.dbConnection.select().from(marketPrices).orderBy(marketPrices.fetchDate);
    }
    /**
     * 
     * @param coinId  coins id from `coins` table
     * @param marketId marker id from `markets` table
     * @param rowCount default 3. Represent time periods, 3 is 15 minutes, 12 is 1 hour, 48 is 4 hours, 288 is 24 hours
     * @returns prices for passed coinId and marketId. limit default 3 that show price changes for last 15 minute 
     */
    async selectBy(coinId: number, marketId: number, rowCount: number | 3): Promise<MarketPriceTypeSelect[]> {
        return this.dbConnection.select().from(marketPrices).where(and(eq(marketPrices.marketId, marketId))).orderBy(marketPrices.fetchDate).limit(rowCount);
    }
}