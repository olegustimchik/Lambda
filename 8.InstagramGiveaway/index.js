import fs from "fs";

// occurrences of the values in file js 
// let occurrences = newArray.reduce((counts, elem) => {
//     return counts[elem] ? counts[elem]++ : counts[elem] = 1, counts;
// }, {});
// console.log(occurrences);
console.time("time ");

const readFiles = new Array();
const filesData = new Object();

for (let i = 0; i < 20; i++) {
    readFiles.push(readFilePromise(`./testData/out${i.toString()}.txt`));
}

function readFilePromise(path) {
    let occurrences = new Object();
    return new Promise(function (resolve, reject) {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject();
            } else {
                data.toString().split("\n").forEach((item) => {
                    occurrences[item] = 1;
                });
                resolve(occurrences);
            }
        });
    });
}

await Promise.all(readFiles).catch(err => { console.log("error") }).then((data) => {
    data.forEach((value) => {
        Object.keys(value).forEach((key) => {
            if (filesData[key]) {
                ++filesData[key];
            } else {
                filesData[key] = 1;
            }
        });
    });
});

function findOccurrences(filesData) {
    let occurrences = { 10: 0, 20: 0 };
    try {
        Object.entries(filesData).forEach(([key, value]) => {
            if (value == 20) {
                ++occurrences["20"];
            }

            if (value >= 10) {
                ++occurrences["10"];
            }
        });
        return occurrences;
    } catch (e) {
        console.log(e);
        return occurrences;
    }
}

function uniqueValues(filesData) {
    try {
        return Object.keys(filesData).length;
    } catch (err) {
        console.log(err);
        return 0;
    }

}

function existInAllFiles(occurrences) {
    try {
        return occurrences["20"];
    } catch (err) {
        console.log(err);
        return 0;
    }
}

function existInAtLeastTen(occurrences) {
    try {
        return occurrences["10"];
    } catch (err) {
        console.log(err);
        return 0;
    }
}

const occurrences = findOccurrences(filesData);
console.log(uniqueValues(filesData));
console.log(existInAllFiles(occurrences));
console.log(existInAtLeastTen(occurrences));
console.timeEnd("time ");