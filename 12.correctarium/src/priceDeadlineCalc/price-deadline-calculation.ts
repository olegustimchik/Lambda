import { stringify } from "querystring";

const dateFormat: Intl.DateTimeFormatOptions = {
    "timeZone": "Europe/Kyiv",
    "hourCycle": "h24",
    "minute": "numeric",
    "hour": "numeric",
    "second": "numeric",
    "year": "numeric",
    "day": "2-digit",
    "month": "2-digit"
};

export default class PriceAndDeadline {
    private allowedDocType: string[];
    private langInformation;
    private startTime; // start work 10:00 
    private endTime; // end work 19:00 
    private formatter;

    constructor() {
        this.allowedDocType = ["doc", "docx", "rtf", "none"];
        this.langInformation = {
            "ua/ru": {
                "minPrice": 50,
                "price": 0.05,
                "wordPerHour": 1333
            },
            "en": {
                "minPrice": 120,
                "price": 0.12,
                "wordPerHour": 333
            }
        };
        this.startTime = 600.0;
        this.endTime = 1140.0;
        this.formatter = new Intl.DateTimeFormat("en", dateFormat);
    }
    checkTypeDoc(timeOrPrice: number, documentType: string): number {
        if (!this.allowedDocType.includes(documentType)) {
            timeOrPrice += timeOrPrice * 0.2;
        }
        return timeOrPrice
    }
    /**
     * 
     * @param documentType string. Document type
     * @param symbolsCount count of symbols in text
     * @param lang language option, can be "ua/ru" or "en" only. "en" - translation english, "ua/ru" - correct the text in Ukrainian or Russian
     * @returns price for work
     */
    priceCalc(documentType: string, symbolsCount: number, lang: "en" | "ua/ru"): number {
        let price: number = symbolsCount * this.langInformation[lang].price;
        if (price < this.langInformation[lang].minPrice) {
            price = this.langInformation[lang].minPrice;
        }
        price = this.checkTypeDoc(price, documentType);
        return price;
    }
    /**
     * 
     * @param documentType string. Document type
     * @param symbolsCount count of symbols in text
     * @param lang language option, can be "ua/ru" or "en" only. "en" - translation english, "ua/ru" - correct the text in Ukrainian or Russian
     * @returns time to work 
     */
    timeToWork(documentType: string, symbolsCount: number, lang: "en" | "ua/ru") {
        let time: number = 0.5 + symbolsCount / this.langInformation[lang].wordPerHour; // hours 
        if (time < 1) {
            time = 1;
        }
        return this.checkTypeDoc(time, documentType);
    }

    convertToMilliseconds(hours: number = 0, minutes: number = 0, seconds: number = 0): number {
        return ((hours) * 60 * 60 + (minutes) * 60 + (seconds)) * 1000;
    }
    /**
     * @param time  number. The time(in hours) needed by the employee. 
     * @param date  date object 
     * @returns true if passed date is working day and hours, otherwise false  
     */
    isWorkingTime(date: Date, time: number): boolean {
        return ((date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60 + time * 60 >= this.startTime) &&
            (date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60 + time * 60 <= this.endTime) &&
            (1 <= date.getDay()) && (date.getDay() <= 5));

    }
    /**
     * used to calculate DEADLINE date 
     * @param orderDate  order date
     * @param time   time to work 
     * @returns deadline date object 
     */
    getDeadlineDate(orderDate: Date, time: number): Date {
        let timeToAdd: number = 0; // time to add in milliseconds
        while (!this.isWorkingTime(orderDate, time)) {
            if ((orderDate.getHours() * 60 + orderDate.getMinutes() + orderDate.getSeconds() / 60 >= this.endTime) && (1 <= orderDate.getDay()) && (orderDate.getDay() <= 5)) {
                orderDate.setHours(24, 0, 0, 0);
            } else if ((orderDate.getHours() * 60 + orderDate.getMinutes() + orderDate.getSeconds() / 60 <= this.startTime) && (1 <= orderDate.getDay()) && (orderDate.getDay() <= 5)) {
                if (time > 9) {
                    time = time - 9;
                    orderDate.setHours(24, 0, 0, 0);
                } else {
                    orderDate.setHours(0, 0, 0, 0);
                }
            } else if ((orderDate.getHours() * 60 + time * 60 + orderDate.getMinutes() + orderDate.getSeconds() / 60 >= this.endTime) && (1 <= orderDate.getDay()) && (orderDate.getDay() <= 5)) {
                time = ((orderDate.getHours() * 60 + time * 60 + orderDate.getMinutes() + orderDate.getSeconds() / 60) - this.endTime) / 60;
                orderDate.setHours(24, 0, 0, 0);
            } else {
                orderDate.setHours(24, 0, 0, 0);
            }
            orderDate.setUTCMilliseconds(orderDate.getUTCMilliseconds() + this.convertToMilliseconds(10));
        }
        orderDate.setUTCMilliseconds(orderDate.getUTCMilliseconds() + this.convertToMilliseconds(time));
        return orderDate;
    }
    /**
     * 
     * @param date date  
     * @returns date converted to string like "mm/dd/yyyy hh:mm:ss"
     */
    stringifyDate(date: Date): string {
        return this.formatter.format(date).replace(",", "");
    }
    /**
     * 
     * @param documentType string. Document type
     * @param symbolsCount count of symbols in text
     * @param lang language option, can be "ua/ru" or "en" only. "en" - translation english, "ua/ru" - correct the text in Ukrainian or Russian     *
     * @param orderDate order date
     * @returns object with price, time, deadline date in unix time format and string
     */
    createUserResponse(documentType: string, symbolsCount: number, lang: "en" | "ua/ru", orderDate: Date) {
        let time = this.timeToWork(documentType, symbolsCount, lang);
        let deadline = this.getDeadlineDate(orderDate, time);
        let price = this.priceCalc(documentType, symbolsCount, lang);
        return {
            "price": Number(price.toFixed(2)),
            "time": Number(time.toFixed(2)),
            "deadline": deadline.valueOf(),
            "deadline_date": this.stringifyDate(deadline)
        }
    }
}