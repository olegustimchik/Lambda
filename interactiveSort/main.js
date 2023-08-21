const prompt = require("prompt-sync")({ sigint: true });


const compareStringsByLength = function (a, b) {
    return a.length - b.length;
}

const compareNumbersAsc = function (a, b) {
    return a - b;
}

const compareNumbersDesc = function (a, b) {
    return b - a;
}

const isNumber = function (numbers, strings, uniqueStrings, string) {
    if (+string || string === "0") {
        numbers.push(+string);
    } else {
        strings.push(string);
        uniqueStrings.add(string);
    }
}



const readString = function () {

    let obj = new Object();
    let original = new Array();
    let numbers = new Array();
    let strings = new Array();
    let unique = new Set();
    let uniqueStrings = new Set();
    console.log("For stop entering type 'stop' or 'exit'")
    while (true) {
        let list = new Array();
        const input = prompt('Enter a string: ');
        if (input === "stop" || input === "exit") {
            break;
        }
        original.push(input);

        isNumber(numbers, strings, uniqueStrings, input);
        unique.add(input);
    }

    obj = {
        1: original,
        2: strings.sort(),
        3: numbers.sort(compareNumbersAsc),
        4: [...numbers].sort(compareNumbersDesc),
        5: [...strings].sort(compareStringsByLength),
        6: [...uniqueStrings],
        7: [...unique]
    };
    return obj;
}


const getUserCommand = function () {
    const obj = readString();
    console.log("----------------------------------------------------------------");

    console.log("What do you want to do? For exit type 'exit'");
    console.log("1. Show original input?");
    console.log("2. Show sorted words?");
    console.log("3. Show ascending sorted numbers?");
    console.log("4. Show descending sorted numbers?");
    console.log("5. Show sorted words by length?");
    console.log("6. Show unique words?");
    console.log("7. Show unique inputs?");

    while (true) {
        const input = prompt('Choose the comand: ');
        if ((input === "exit") || !(+input) || (+input < 1 || +input > 7)) {
            break;
        }

        console.log(obj[+input]);
    }

}

getUserCommand(); 