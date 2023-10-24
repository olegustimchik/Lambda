import type { MySql2Database, MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { CoinTypeInsert, CoinTypeSelect } from "../types/types.ts";
import { coins } from "../schemas/schema.ts";
import { eq } from "drizzle-orm";

export class CoinModel {
    private dbConnection: MySql2Database;
    constructor(dbConnection: MySql2Database) {
        this.dbConnection = dbConnection;
    }

    async insertInto(coin: CoinTypeInsert): Promise<void | MySqlRawQueryResult> {
        return this.dbConnection.insert(coins).values({ coinSymbol: coin.coinSymbol }).onDuplicateKeyUpdate({ set: { coinSymbol: coin.coinSymbol } });
    }

    async selectAll(): Promise<CoinTypeSelect[]> {
        return this.dbConnection.select().from(coins);
    }

    async selectById(coinId: number): Promise<CoinTypeSelect[]> {
        return this.dbConnection.select().from(coins).where(eq(coins.id, coinId));
    }

    async selectByCoinSymbol(coinSymbol: string): Promise<CoinTypeSelect[]> {
        return this.dbConnection.select().from(coins).where(eq(coins.coinSymbol, coinSymbol));
    }
}