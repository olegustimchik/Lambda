import uploadFile from "./drive-uploader.js";
import getShortenURl from "./shorten-url.js";
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import fs from "fs";
import { getFileSize, getFileName, writeToFile } from "./file-description-write.js";

InterruptedPrompt.fromAll(inquirer);

const containOnlyLetters = function (str) {
    return /^[a-zA-Z]*$/.test(str);
}

const getImageTitle = function (str) {
    return str.split("\\").pop().split("/").pop().split(".")[0];
}

const isEmpty = (str) => {
    return (!str) || (str === " ");
}

const fetchURL = async function (ans1, ans2) {
    let url;
    if (ans2.change_name) {
        url = await uploadFile(ans1.file_location, ans2.changed_name);
    } else {
        url = await uploadFile(ans1.file_location);
    }

    if (ans2.shorten_url && url !== "OOPS SOMETHING WENT WRONG") {
        url = await getShortenURl(url).then((resp) => { return resp.data.data.tiny_url; });
    }
    console.log(url);
}


const questions = [
    {
        type: "input",
        name: "file_location",
        message: "Enter path to your file or drag and drop a file to terminal : ",
        interruptedKeyName: "escape",
        filter(data) {
            if (isEmpty(data)) {
                return data;
            }
            return data;
        }
    }];

const imageInformationQuestions = function (prevAnswers) {
    return [{
        when() {
            return !isEmpty(prevAnswers.file_location);
        },
        type: "confirm",
        name: "upload_file",
        message: `Would you like to upload file ? `,
        default: true
    }, {
        when(answers) {
            return answers.upload_file;
        },
        type: "confirm",
        name: "change_name",
        message: `You upload file ${getImageTitle(prevAnswers.file_location)}.\n Do you want to change file name? `,
        default: false
    }, {
        when(answers) {
            return answers.upload_file && answers.change_name;
        },
        type: "input",
        name: "changed_name",
        message: `Type new file name:`,
    }, {
        when(answers) {
            return answers.upload_file;
        },
        type: "confirm",
        name: "shorten_url",
        message: `Do you want to shorten the URL? `,
        default: false
    }];
}



const userImage = async function () {
    const ans1 = await inquirer.prompt(questions).then((answers) => {
        return answers;
    }).catch((error) => {
        if (error.isTtyError) {
            console.log(error);
        } else {
            if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
                console.log("\nPrompt has been interrupted");
            }
        }
        return { "file_location": '' };
    });
    console.log(ans1);

    const ans2 = await inquirer.prompt(imageInformationQuestions(ans1)).then((answers) => {
        if (answers.upload_file) {
            fetchURL(ans1, answers);
        }
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

userImage(); 