import type { MySql2Database, MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { CoinTypeInsert, CoinTypeSelect } from "../types/types.ts";
import { coins } from "../schemas/schema.ts";
import { eq, sql } from "drizzle-orm";

export class CoinRepository {
    private dbConnection: MySql2Database;
    constructor(dbConnection: MySql2Database) {
        this.dbConnection = dbConnection;
    }

    insertInto = async (coin: CoinTypeInsert): Promise<void | MySqlRawQueryResult> => {
        return this.dbConnection.insert(coins).values({ coinSymbol: coin.coinSymbol }).onDuplicateKeyUpdate({ set: { coinSymbol: coin.coinSymbol } });
    }

    insertManyInto = async (coinList: CoinTypeInsert[]): Promise<void | MySqlRawQueryResult> => {
        return this.dbConnection.insert(coins).values(coinList).onDuplicateKeyUpdate({ set: { coinSymbol: sql`coin_symbol` } });
    }

    selectAll = async (): Promise<CoinTypeSelect[]> => {
        return this.dbConnection.select().from(coins);
    }

    selectById = async (coinId: number): Promise<CoinTypeSelect[]> => {
        return this.dbConnection.select().from(coins).where(eq(coins.id, coinId));
    }

    selectByCoinSymbol = async (coinSymbol: string): Promise<CoinTypeSelect[]> => {
        return this.dbConnection.select().from(coins).where(eq(coins.coinSymbol, coinSymbol));
    }
}