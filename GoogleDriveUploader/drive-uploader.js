import { google } from "googleapis";
import fs from "fs";
import axios from "axios";
import { getAccessToken } from "./google-access-token.js";
import { getFileSize, getFileName, getFileType} from "./file-description-write.js"

export default async function uploadFile(...args) {
    let urlToFile;
    let accessToken, fileSize;
    try {
        [accessToken, fileSize] = await Promise.all([getAccessToken(), getFileSize(args[0])]);
    } catch (e) {
        fileSize = 0;
    }

    if ((accessToken === undefined) && (fileSize === 0)) {
        return "OOPS SOMETHING WENT WRONG";
    }
    
    await axios({
        method: "POST",
        url: "https://www.googleapis.com/upload/drive/v3/files",
        params: {
            "uploadType": "resumable"
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            name: args[1] || getFileName(args[0]),
            mimeType: getFileType(args[0]) ,
            parents: ["1jLoWQ1QtK-W8dsAX93ZjnLJFqHEJcC0a"]
        }),
    }).then(async ({ headers: { location } }) => {
        const data = fs.createReadStream(args[0]);

        await axios({
            method: "PUT",
            url: location,
            headers: { "Content-Range": `bytes 0-${fileSize.size - 1}/${fileSize.size}` },
            data: data,
        }).then(({ data }) => {
            urlToFile = `https://drive.google.com/file/d/${data.id}/view?usp=drive_link`
        });
    });
    return urlToFile;
}
