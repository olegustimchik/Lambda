import { marketPrices, markets } from "../schemas/schema.ts";
import { MarketPriceTypeInsert, MarketPriceTypeSelect } from "../types/tables.ts";
import type { MySql2Database, MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { eq, and, desc, sql } from "drizzle-orm";
import { helper } from "../services/helper.ts";
export class MarketPricesRepository {
    private dbConnection: MySql2Database;
    constructor(dbConnection: MySql2Database) {
        this.dbConnection = dbConnection;
    }

    async insertOne(marketPrice: MarketPriceTypeInsert): Promise<void | MySqlRawQueryResult> {
        return this.dbConnection.insert(marketPrices).values(marketPrice);
    }

    async insertMany(marketPrice: MarketPriceTypeInsert[]): Promise<void | MySqlRawQueryResult> {
        return this.dbConnection.insert(marketPrices).values(marketPrice);
    }

    async selectAll(): Promise<MarketPriceTypeSelect[]> {
        return this.dbConnection.select().from(marketPrices).orderBy(marketPrices.fetchDate);
    }
    /**
     *
     * @param coinId  coins id from `coins` table
     * @param marketId marker id from `markets` table
     * @param period default 3. Represent time periods in minutes, 15 minutes
     * @returns prices for passed coinId and marketId. limit default 3 that show price changes for last 15 minute
     */
    async selectBy(coinId: number, marketId: number, period: number | 15): Promise<MarketPriceTypeSelect[]> {
        return this.dbConnection
            .select()
            .from(marketPrices)
            .where(
                and(
                    eq(marketPrices.marketId, marketId),
                    eq(marketPrices.coinId, coinId),
                    sql`timestampdiff(minute,${marketPrices.fetchDate},${helper.convertDateToMysqlDate(
                        new Date()
                    )}) <= ${period.toString()}`
                )
            )
            .orderBy(desc(marketPrices.fetchDate));
    }

    /**
     *
     * @param coinId  coins id from `coins` table
     * @param marketId marker id from `markets` table
     * @param period default 3. Represent time periods in minutes, 15 minutes
     * @returns prices for passed coinId and marketId. limit default 3 that show price changes for last 15 minute
     */
    async selectAverageBy(
        coinId: number,
        marketId: number,
        period: number | 15
    ): Promise<{ coinId: number | null; marketId: number | null; price: string }[]> {
        return this.dbConnection
            .select({
                coinId: marketPrices.coinId,
                marketId: marketPrices.marketId,
                price: sql<string>`AVG(${marketPrices.price})`,
            })
            .from(marketPrices)
            .where(
                and(
                    eq(marketPrices.marketId, marketId),
                    eq(marketPrices.coinId, coinId),
                    sql`timestampdiff(minute,${marketPrices.fetchDate},${helper.convertDateToMysqlDate(
                        new Date()
                    )}) <= ${period.toString()}`
                )
            )
            .orderBy(desc(marketPrices.fetchDate));
    }

    /**
     *
     * @param coinId  coins id from `coins` table
     * @param period default 15. Represent time periods in minutes
     * @returns prices for passed coinId and marketId. limit default 3 that show price changes for last 15 minute
     */
    async averagePrice(coinId: number, period: number | 15): Promise<{ coinId: number | null; price: string }[]> {
        return this.dbConnection
            .select({ coinId: marketPrices.coinId, price: sql<string>`AVG(${marketPrices.price})` })
            .from(marketPrices)
            .where(
                and(
                    eq(marketPrices.coinId, coinId),
                    sql`timestampdiff(minute, fetch_date, ${helper.convertDateToMysqlDate(
                        new Date()
                    )}) <= ${period.toString()}`
                )
            );
    }
}
