import { writeFile, stat } from "fs/promises";
import mime from 'mime-types';

export const getFileName = function (str) {
    return str.split("\\").pop().split("/").pop().split(".")[0];
}

export const writeToFile = function (data, path) {
    return writeFile(path, JSON.stringify(data));
}

export const getFileSize = function (pathToFile) {
    return stat(pathToFile);
}

export const getFileType = function (pathToFile) {
    return mime.lookup(pathToFile); 
}