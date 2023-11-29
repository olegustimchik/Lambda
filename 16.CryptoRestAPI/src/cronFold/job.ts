import { CronJob } from "cron";
import { MarketFactory } from "../markets/market-factory.ts";
import { SaveDataFromMarketController } from "../controllers/saveDataFromMarket.ts";
const marketFactory = new MarketFactory();

export class CronScheduler {
    private saveDataFromMarketController: SaveDataFromMarketController;
    private cronJob: CronJob;
    private frequency: number;
    constructor(saveDataFromMarketController: SaveDataFromMarketController, frequency: number) {
        this.saveDataFromMarketController = saveDataFromMarketController;
        this.frequency = frequency;
        this.cronJob = new CronJob(`0 */0${frequency} * * * *`, this.inEachPeriod);
    }

    inEachPeriod = () => {
        try {
            this.saveDataFromMarketController.saveDataFromMarket(marketFactory.getCoinBase(), "CoinBase");
            this.saveDataFromMarketController.saveDataFromMarket(marketFactory.getCoinPaprika(), "CoinPaprika");
            this.saveDataFromMarketController.saveDataFromMarket(marketFactory.getCoinStats(), "CoinStats");
            this.saveDataFromMarketController.saveDataFromMarket(marketFactory.getKucoin(), "Kucoin");
            this.saveDataFromMarketController.saveDataFromMarket(marketFactory.getCoinMarketCap(), "CoinMarketCap");
        } catch (err) {
            console.log(err);
        }
        const d = new Date();
        console.log(`Every ${this.frequency} Minute:`, d);
    };

    start = () => {
        this.cronJob.start();
    };
}
