import { Request } from "express";

export class HelperService {
    isValidUrl = (url: string) => {
        try {
            const newUrl = new URL(url);
            return newUrl.protocol === "http:" || newUrl.protocol === "https:";
        } catch (err) {
            return false;
        }
    }

    generateRandomString = (length: number) => {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    getHostUrl = (req: Request) => {
        return req.protocol + "://" + req.get("host") + "/";
    }
}