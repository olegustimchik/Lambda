import { types } from "util";
import PriceAndDeadline from "../priceDeadlineCalc/price-deadline-calculation.ts";

test.each([
    { lang: "en", mimetype: "zip", count: 100000, orderDate: new Date(1695206880000), expected: { "deadline": 1700052337297, "deadline_date": "11/15/2023 14:45:37", "price": 14400, "time": 360.96 } },
    { lang: "en", mimetype: "doc", count: 500, orderDate: new Date(1695553776000), expected: { "deadline": 1695632405405, "deadline_date": "09/25/2023 12:00:05", "price": 120, "time": 2 } },
    { lang: "ua/ru", mimetype: "other", count: 5000, orderDate: new Date(1693578960000), expected: { "deadline": 1693824124051, "deadline_date": "09/04/2023 13:42:04", "price": 300, "time": 5.1 } },
    { lang: "ua/ru", mimetype: "none", count: 2000, orderDate: new Date(1693578960000), expected: { "deadline": 1693812961350, "deadline_date": "09/04/2023 10:36:01", "price": 100, "time": 2} },
    {
        mimetype: "doc",
        lang: "en",
        count: 700,
        orderDate: new Date(1632717600000),
        expected: { "deadline":1632735367567, "deadline_date": "09/27/2021 12:36:07", "price": 120, "time": 2.6 }
    },
    {
        mimetype: "pdf",
        lang: "ua/ru",
        count: 3000,
        orderDate: new Date(1632798000000),
        expected: { "deadline": 1632824282430, "deadline_date": "09/28/2021 13:18:02", "price": 180, "time": 3.3 }
    },
    {
        mimetype: "ppt",
        lang: "en",
        count: 460,
        orderDate: new Date(1632990800000),
        expected: { "deadline": 1632998927567, "deadline_date": "09/30/2021 13:48:47", "price": 144, "time": 2.26 }
    }
])(`deadline calculation `, ({ lang, mimetype, count, orderDate, expected }) => {
    let priceDeadline = new PriceAndDeadline();
    expect(priceDeadline.createUserResponse(mimetype, count, lang as "en" | "ua/ru", orderDate)).toEqual(expected);

});

