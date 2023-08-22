import { google } from "googleapis";
import fs from "fs";
import { oathClient } from "./credentials.js";
import { writeToFile } from "./file-description-write.js"

export const refreshToken = async function () {
    let accessToken;
    await oathClient.getAccessToken().then(async (message, err) => {
        if (err) {
            console.error(err);
        } else {
            accessToken = message.res.data.access_token;
            writeToFile(message.res.data, "./TOKEN.json");
        }
    });
    return accessToken;
}

export const getAccessToken = function () {
    return new Promise((resolve, reject) => {
        fs.readFile("TOKEN.json", "utf8", async (err, data) => {
            let accessToken;
            if ((Date.now() - JSON.parse(data).expiry_date) > 0) {
                accessToken = await refreshToken();
            } else {
                accessToken = JSON.parse(data).access_token;
            };
            if (err) {
                reject();
            }
            resolve(accessToken);
        })
    });
}