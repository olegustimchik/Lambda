import axios from "axios";
import dotenv from "dotenv";
dotenv.config("./.env");
const tinyURL = 'https://api.tinyurl.com/create';

export default function getShortenURl(url) {
    return axios({
        method: "POST",
        url: tinyURL,
        headers: {
            Authorization: `Bearer ${process.env.TINY_URL_TOKEN}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            "url": url,
            "domain": "tinyurl.com"
        })
    })
}
