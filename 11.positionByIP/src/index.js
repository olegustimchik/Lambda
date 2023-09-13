import express from 'express';
import fs from 'fs';
import getIP from '../searchRequestIP/request-ip.js';
import convertIpToDecimal from '../converter/convertIpToDecimal.js';
import readIPs from '../resources/readIPs.js';
import binarySearch from './binarySearch.js';

const port = 3000;
const app = express();
const ranges = await readIPs().then((res) => {
    return res;
}).catch((err) => {
    if (err) {
        console.log(err);
    }
});

app.get('/', (req, res) => {
    try {
        let respObject = new Object(); 
        let clientIp = getIP(req); 
        let convertedIP = convertIpToDecimal(clientIp); 
        let range = binarySearch(ranges, convertedIP); 
        if (convertedIP && clientIp && range){ 
            respObject.yourIP = clientIp; 
            respObject.location = range.country; 
            respObject.range = range; 
        } else { 
            respObject.errorMassage = "error occurred while trying to convert your ip"; 
            respObject.yourIP = clientIp; 
            respObject.range = range; 
        }
        console.log(respObject);
        res.send(respObject);
    } catch (e) {
        console.log({"error" : e.code, "message" : e.message});
        res.send({"error" : e.code, "message" : e.message});
    }
});

app.listen(port);

