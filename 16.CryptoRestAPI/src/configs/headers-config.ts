import * as dotenv from "dotenv";
dotenv.config();

const headersConfig = {
    coin_market_cap: process.env.COIN_MARKET_CAP,
    coin_stats: process.env.COIN_STATS,
};

export default headersConfig;
