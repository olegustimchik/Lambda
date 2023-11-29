class HelperService {
    convertDateToMysqlDate = (date: Date): string => {
        const mysqlDate = date.toISOString().replace("T", " ").replace("Z", "");
        return mysqlDate;
    };

    getMinutesFromPeriod = (period: string): number => {
        let minutes = 0;
        if (period.includes("h") || period.includes("m")) {
            const array = period.split("h");
            minutes += Number(array[0]) * 60 || Number(array[0].split("m")[0]);
        }
        return minutes;
    };
}

export const helper = new HelperService();
