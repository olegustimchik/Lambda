import { CoinMarketCap } from "./coin-market-cap.ts";
import { CoinBase } from "./coin-base.ts";
import { CoinPaprika } from "./coin-paprika.ts";
import { Kucoin } from "./kucoin.ts";
import { CoinStats } from "./coin-stats.ts";

export class MarketFactory {
    private coinMarketCap: CoinMarketCap;
    private coinBase: CoinBase;
    private coinPaprika: CoinPaprika;
    private kucoin: Kucoin;
    private coinStats: CoinStats;

    constructor() {
        this.coinMarketCap = new CoinMarketCap();
        this.coinBase = new CoinBase();
        this.coinPaprika = new CoinPaprika();
        this.kucoin = new Kucoin();
        this.coinStats = new CoinStats();
    }

    getCoinMarketCap(): CoinMarketCap {
        return this.coinMarketCap;
    }

    getCoinBase(): CoinBase {
        return this.coinBase;
    }

    getCoinPaprika(): CoinPaprika {
        return this.coinPaprika;
    }

    getKucoin(): Kucoin {
        return this.kucoin;
    }

    getCoinStats(): CoinStats {
        return this.coinStats;
    }
}
