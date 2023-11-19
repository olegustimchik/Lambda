import { CronJob } from "cron";
import { MarketFactory } from "../markets/market-factory.ts";
import { SaveDataFromMarketController } from "../controllers/save-data-from-market-controller.ts";
const marketFactory = new MarketFactory();

export class CronScheduler {
    private saveDataFromMarketController: SaveDataFromMarketController;
    private cronJob: CronJob;
    constructor(saveDataFromMarketController: SaveDataFromMarketController) {
        this.saveDataFromMarketController = saveDataFromMarketController;
        this.cronJob = new CronJob('0 */05 * * * *', this.inEachFiveMinutes);
    }

    inEachFiveMinutes = () => {
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
        console.log('Every 5 Minute:', d);
    }

    start = () => { 
        this.cronJob.start();
    }
}

