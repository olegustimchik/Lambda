// const { txtDb } = require('./txtDb'); 
import txtDb from "./txtDb.js";
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";


const capitalize = function (str) {
    if (str.length == 1) {
        return str.toUpperCase();
    }
    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
}

const containOnlyLetters = function (str) {
    return /^[a-zA-Z]*$/.test(str);
}

const isEmpty = (str) => {
    return (!str) || (str === " ");
}


const db = new txtDb("./DB.txt");
// const array = db.selectFrom();

InterruptedPrompt.fromAll(inquirer);

const questions = [
    {
        type: "input",
        name: "userName",
        message: "Enter user's name: ",
        interruptedKeyName: "escape",
        validate(data) {
            if (!containOnlyLetters(data)) {
                return "user's name should contain only letters";
            }
            return true;

        },
        filter(data) {
            if (isEmpty(data)) {
                return data;
            }
            return capitalize(data);
        }
    },
    {
        when(answers) {
            return !isEmpty(answers.userName);
        },
        type: "list",
        name: "gender",
        message: "Choose user's gender: ",
        choices: ["male", "female"]
    },
    {
        when(answers) {
            return !isEmpty(answers.userName);
        },
        type: "input",
        name: "age",
        message: "Enter user's age: ",
        validate(value) {
            if (isNaN(parseFloat(value)) || value < 0) {
                return "enter valid value";
            }
            return true;
        },
        filter(value) {
            return Math.round(value);
        }
    }];

const selectFromDBQuestion = [
    {
        type: "confirm",
        name: "selectFromDB",
        message: "Do you want to select from DB: ",
        default: false
    },
    {
        when(answers) {
            return answers.selectFromDB;
        },
        type: "input",
        name: "name",
        message: "What name do you search for: ",
        interruptedKeyName: "escape",
        validate(value) {
            if (!containOnlyLetters(value) || isEmpty(value)) {
                return "enter valid data";
            }
            return true;
        },
        filter(data) {
            return capitalize(data);
        }
    }];

const createNewUsers = async function () {
    await inquirer.prompt(questions).then((answers) => {
        if (isEmpty(answers.userName)) {
            return answers;
        }
        console.log(answers);
        db.insertInto(JSON.stringify(answers));
        return createNewUsers();
    }).catch((error) => {
        if (error.isTtyError) {
            console.error(error);
        } else {
            if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
                console.log("\nPrompt has been interrupted");
            }
        }
    });
}

const selectFromDB = async function(){ 
    await inquirer.prompt(selectFromDBQuestion).then((answers) => {
        db.selectWhere(answers.name);
    }).catch((error) => {
        if (error.isTtyError) {
            console.log(error);
        } else {
            if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
                console.log("\nPrompt has been interrupted");
            }
        }
    });
}

await createNewUsers();

await selectFromDB(); 













