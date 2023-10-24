import { coins, markets, marketPrices } from "../schemas/schema.ts";

export type MarketTypeInsert = typeof markets.$inferInsert;
export type CoinTypeInsert = typeof coins.$inferInsert;
export type MarketPriceTypeInsert = typeof marketPrices.$inferInsert; 

export type MarketTypeSelect = typeof markets.$inferSelect; 
export type CoinTypeSelect = typeof coins.$inferSelect; 
export type MarketPriceTypeSelect = typeof marketPrices.$inferSelect;