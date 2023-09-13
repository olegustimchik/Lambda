import fs from 'fs';

export default function readIpPromise() {
    const ipRange = new Array();
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/IP2LOCATION-LITE-DB1.CSV", (err, data) => {
            if (err) {
                console.log(err); 
                reject("error");
            } else {
                data.toString().split('\r\n').forEach((line, index) => {
                    let separatedString = line.split(',');
                    ipRange.push({ "lowBound": Number(separatedString[0].replace(/"/g, '')), "highBound": Number(separatedString[1].replace(/"/g, '')), "countryCode": separatedString[2].replace(/"/g, ''), "country": separatedString[3].replace(/"/g, '') });
                });
                resolve(ipRange);
            }

        });
    })
}
