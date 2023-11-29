export type CurrencyDetail = {
    price: string;
    date: number;
};

export type CurrencyInformation = {
    coin: string | undefined;
    coinId: number | undefined;
    details: CurrencyDetail;
};
