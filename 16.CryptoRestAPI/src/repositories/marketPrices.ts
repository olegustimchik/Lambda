import { coins, marketPrices, markets } from "../schemas/schema.ts";
import { MarketPriceTypeInsert, MarketPriceTypeSelect } from "../types/tables.ts";
import type { MySql2Database, MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { eq, and, desc, sql, inArray } from "drizzle-orm";
import { helper } from "../services/helper.ts";
export class MarketPricesRepository {
    private dbConnection: MySql2Database;
    constructor(dbConnection: MySql2Database) {
        this.dbConnection = dbConnection;
    }

    insertOne = async (marketPrice: MarketPriceTypeInsert): Promise<void | MySqlRawQueryResult> => {
        return this.dbConnection.insert(marketPrices).values(marketPrice);
    }

    insertMany = async (marketPrice: MarketPriceTypeInsert[]): Promise<void | MySqlRawQueryResult> => {
        return this.dbConnection.insert(marketPrices).values(marketPrice);
    }

    selectAll = async (): Promise<MarketPriceTypeSelect[]> => {
        return this.dbConnection.select().from(marketPrices).orderBy(marketPrices.fetchDate);
    }
    /**
     *
     * @param coinId  coins id from `coins` table
     * @param marketId marker id from `markets` table
     * @param period default 3. Represent time periods in minutes, 15 minutes
     * @returns prices for passed coinId and marketId. limit default 3 that show price changes for last 15 minute
     */
    selectBy = async (coinId: number, marketId: number, period: number | 15): Promise<MarketPriceTypeSelect[]> => {
        return this.dbConnection
            .select()
            .from(marketPrices)
            .where(
                and(
                    eq(marketPrices.marketId, marketId),
                    eq(marketPrices.coinId, coinId),
                    sql`timestampdiff(minute,${marketPrices.fetchDate},${helper.convertDateToMysqlDate(new Date())}) <= ${period.toString()}`
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
    selectAverageBy = async (
        coinId: number,
        marketId: number,
        period: number | 15
    ): Promise<{ coinId: number | null; marketId: number | null; price: string }[]> => {
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
                    sql`timestampdiff(minute,${marketPrices.fetchDate},${helper.convertDateToMysqlDate(new Date())}) <= ${period.toString()}`
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
    averagePrice = async (coinId: number, period: number | 15): Promise<{ coinId: number | null; price: string }[]> => {
        return this.dbConnection
            .select({ coinId: marketPrices.coinId, price: sql<string>`AVG(${marketPrices.price})` })
            .from(marketPrices)
            .where(
                and(
                    eq(marketPrices.coinId, coinId),
                    sql`timestampdiff(minute, fetch_date, ${helper.convertDateToMysqlDate(new Date())}) <= ${period.toString()}`
                )
            );
    }

    averagePriceJoinCoins = async (coinSymbols: string[], period: number | 15): Promise<{ coinId: number | null; price: string, coinSymbol: string }[]> => {
        return this.dbConnection
            .select({ coinId: marketPrices.coinId, price: sql<string>`AVG(${marketPrices.price})`, coinSymbol: coins.coinSymbol })
            .from(marketPrices).innerJoin(coins, eq(marketPrices.coinId, coins.id))
            .where(
                and(
                    inArray(coins.coinSymbol, coinSymbols),
                    sql`timestampdiff(minute, fetch_date, ${helper.convertDateToMysqlDate(new Date())}) <= ${period.toString()}`
                )
            ).groupBy(coins.id);
    }

    averagePriceByMarketJoinCoins = async (marketId: number, coinSymbols: string[], period: number | 15): Promise<{ coinId: number | null; price: string, coinSymbol: string }[]> => {
        return this.dbConnection
            .select({ coinId: marketPrices.coinId, price: sql<string>`AVG(${marketPrices.price})`, coinSymbol: coins.coinSymbol })
            .from(marketPrices).innerJoin(coins, eq(marketPrices.coinId, coins.id))
            .where(
                and(
                    eq(marketPrices.marketId, marketId),
                    inArray(coins.coinSymbol, coinSymbols),
                    sql`timestampdiff(minute, fetch_date, ${helper.convertDateToMysqlDate(new Date())}) <= ${period.toString()}`
                )
            ).groupBy(coins.id);
    }
}
