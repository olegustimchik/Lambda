import { markets } from "../schemas/schema.ts";
import { MarketTypeInsert, MarketTypeSelect } from "../types/types.ts";
import type { MySql2Database, MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { eq } from "drizzle-orm";

export class MarketRepository {
    private dbConnection: MySql2Database;
    constructor(dbConnection: MySql2Database) {
        this.dbConnection = dbConnection;
    }

    async insertInto(market: MarketTypeInsert): Promise<void | MySqlRawQueryResult> {
        return this.dbConnection.insert(markets).values(market).onDuplicateKeyUpdate({ set: { marketName: market.marketName } });
    }

    async selectAll(): Promise<MarketTypeSelect[]> {
        return this.dbConnection.select().from(markets);
    }

    async selectById(id: number): Promise<MarketTypeSelect[]> {
        return this.dbConnection.select().from(markets).where(eq(markets.id, id));
    }

    async selectByName(marketName: string): Promise<MarketTypeSelect[]> {
        return this.dbConnection.select().from(markets).where(eq(markets.marketName, marketName));
    }
}