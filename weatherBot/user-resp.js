const options = {
    month: "long",
    day: "numeric",
    hourCycle: "h24",
    weekday: "long",
    timeZone: 'Europe/Kyiv'
};

export const createUserResponse = function (weatherInf) {
    let result = "";
    if (weatherInf.error) {
        console.log(weatherInf.error);
        result = "Oops something went wrong";
    } else {

        Object.keys(weatherInf).forEach((key) => {
            // console.log(`${key} :  ${weatherInf[key][0]["main"]}`);
            if (key !== "error") {
                result += (new Intl.DateTimeFormat("en-US", options).format(new Date(key))) + "\n";
                weatherInf[key].forEach((elem) => {
                    result += "    " + elem.dt_txt.substring(11, 16);
                    result += ", temperature " + elem.main.temp + "℃ , " + elem.weather[0].description + "\n";
                });
            }
        });
    }
    return result;
}
