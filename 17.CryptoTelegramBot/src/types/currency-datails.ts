export type CurrencyDetail = {
    price: string;
    date: number;
}
type Market = {
    id: number;
    marketName: string;
}

export type CurrencyInformation = {
    coin: string | undefined;
    coinId: number | undefined;
    markets: Market[];
    details: CurrencyDetail[];
}