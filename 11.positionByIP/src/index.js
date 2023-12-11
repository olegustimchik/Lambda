import express from "express";
import convertIpToDecimal from './converter/convertIpToDecimal.js';
import readIPs from '../resources/readIPs.js';
import binarySearch from './search/binarySearch.js';

const port = 3000;
const app = express();
const ranges = await readIPs().then((res) => {
    return res;
}).catch((err) => {
    if (err) {
        console.log(err);
    }
});
app.set('trust proxy', true);
app.get('/', (req, res) => {
    try {
        let clientIp = req.ip;
        let convertedIP = convertIpToDecimal(clientIp);
        let range;
        if (clientIp && convertedIP) {
            range = binarySearch(ranges, convertedIP);
            console.log(`client IP(req.ip): ${clientIp}`);
            return res.send({ "IP": clientIp, "countryCode":range.countryCode,"country":range.country });
        }

        clientIp = req.socket.remoteAddress;
        convertedIP = convertIpToDecimal(clientIp);
        if (clientIp && convertedIP) {
            range = binarySearch(ranges, convertedIP);
            console.log(`client IP(req.socket.remoteAddress): ${clientIp}`);
            return res.send({ "IP": clientIp, "countryCode":range.countryCode,"country":range.country });
        }

        clientIp = req.rawHeaders[req.rawHeaders.findIndex((elem) => elem === "X-Forwarded-For") + 1];
        convertedIP = convertIpToDecimal(clientIp);
        if (clientIp && convertedIP) {
            range = binarySearch(ranges, convertedIP);
            console.log(`client IP(req.rawHeaders): ${clientIp}`);
            return res.send({ "IP": clientIp, "countryCode":range.countryCode,"country":range.country });
        }
        res.status(500).json({"error": "can't get your ip"});
    } catch (e) {
        console.log({ "error": e.code, "message": e.message });
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});

