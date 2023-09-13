import fs from 'fs';

function userInList(array, elem) {
    return array.findIndex((item) => item.userId === elem.user._id) || -1;

}

function writeGroupedData(groupedData) {
    fs.writeFile("./grouped.json", JSON.stringify(groupedData), function (err) {
        if (err) {
            console.log(err);
        }
    });
}



fs.readFile("./ungrouped.json", function (err, data) {
    let ungroupedData = null;
    let groupedData = new Array();
    let index = -1;
    if (err) {
        console.log(err);
    }
    else {
        try {
            ungroupedData = JSON.parse(data.toString());
            ungroupedData.forEach(element => {
                index = userInList(groupedData, element);
                if (index == -1) {
                    groupedData.push({
                        "userId": element.user._id,
                        "name": element.user.name,
                        "weekendDates": [{
                            "startDate": element.startDate,
                            "endDate": element.endDate
                        }]
                    });
                } else {
                    groupedData[index]["weekendDates"].push({
                        "startDate": element.startDate,
                        "endDate": element.endDate
                    });
                }

            });
            writeGroupedData(groupedData);
        } catch (e) {
            console.log(e);
            console.log("error occurred");
        }
    }
}); 