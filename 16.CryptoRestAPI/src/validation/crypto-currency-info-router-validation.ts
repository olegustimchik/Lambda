export function getMinutesFromPeriod(period: string): number {
    switch (period) {
        case "15m":
            return 15;
        case "1h":
            return 60;
        case "4h":
            return 240;
        case "24h":
            return 1440;
        default:
            return 15;
    }
}
