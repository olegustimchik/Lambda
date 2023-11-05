import axios, { AxiosResponse, AxiosInstance, AxiosHeaders } from "axios";
import { Rate } from "../types/rate.ts";
export abstract class Market {
    protected instance: AxiosInstance;
    constructor(url: string, headers: Object) {
        this.instance = axios.create({
            baseURL: url,
            headers: headers
        })
    }

    abstract createRequests(): Promise<AxiosResponse>;
    abstract getData(): Promise<Rate[]>;
}