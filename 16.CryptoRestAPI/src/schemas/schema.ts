import {
    mysqlTable,
    mysqlSchema,
    AnyMySqlColumn,
    uniqueIndex,
    int,
    varchar,
    index,
    decimal,
    datetime,
} from "drizzle-orm/mysql-core";

export const coins = mysqlTable(
    "coins",
    {
        id: int("id").autoincrement().primaryKey().notNull(),
        coinSymbol: varchar("coin_symbol", { length: 25 }).notNull(),
    },
    (table) => {
        return { coinSymbolsIdx: uniqueIndex("coin_symbols_idx").on(table.coinSymbol) };
    }
);

export const markets = mysqlTable(
    "markets",
    {
        id: int("id").autoincrement().primaryKey().notNull(),
        marketName: varchar("market_name", { length: 50 }).notNull(),
    },
    (table) => {
        return { marketNameIdx: uniqueIndex("market_name_idx").on(table.marketName) };
    }
);

export const marketPrices = mysqlTable("market_prices", {
    price: decimal("price", { precision: 20, scale: 10 }).notNull(),
    fetchDate: datetime("fetch_date"),
    coinId: int("coin_id").references(() => coins.id),
    marketId: int("market_id").references(() => markets.id),
});
