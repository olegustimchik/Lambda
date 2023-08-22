import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export class WeatherForecast {
    constructor(latitude, longitude) {
        this.instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`,
            timeout: 1000
        });
    }

    async getThreeHoursForecast() {
        let result = [];
        await this.instance.get().then((response) => {
            result = response.data.list.reduce((accumulator, currentValue) => {
                accumulator[currentValue.dt_txt.substring(0, 10)] = (accumulator[currentValue.dt_txt.substring(0, 10)] || []);
                accumulator[currentValue.dt_txt.substring(0, 10)].push(currentValue);
                return accumulator;
            }, Object.create(null));
            result["error"] = false;
        }).catch((err) => {
            if (err.response) {
                result["error"] = {
                    "code": err.response.status,
                    "message": err.response.data.message
                };
            } else if (err.request) {
                result["error"] = {
                    "code": err.cause.code,
                    "message": err.cause.code
                };
            } else {
                result["error"] = {
                    "code": "settingUpError",
                    "message": err.message
                };
            }
        });
        return result;
    }

    async getSixHoursForecast(APIkey) {
        let result = [];
        await this.instance.get().then((response) => {
            result = response.data.list.reduce((accumulator, currentValue) => {
                if ((currentValue.dt_txt.substring(11) === "03:00:00") || (currentValue.dt_txt.substring(11) === "09:00:00") || (currentValue.dt_txt.substring(11) === "15:00:00") || (currentValue.dt_txt.substring(11) === "21:00:00")) {
                    accumulator[currentValue.dt_txt.substring(0, 10)] = (accumulator[currentValue.dt_txt.substring(0, 10)] || []);
                    accumulator[currentValue.dt_txt.substring(0, 10)].push(currentValue);
                }
                return accumulator;
            }, Object.create(null));
            result["error"] = false;
        }).catch((err) => {
            if (err.response) {
                result["error"] = {
                    "code": err.response.status,
                    "message": err.response.data.message
                };
            } else if (err.request) {
                result["error"] = {
                    "code": err.cause.code,
                    "message": err.cause.code
                };
            } else {
                result["error"] = {
                    "code": "settingUpError",
                    "message": err.message
                };
            }
        });
        return result;
    }
}



