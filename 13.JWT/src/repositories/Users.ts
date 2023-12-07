import { Db, Collection } from "mongodb";

export default class UsersRepository {
    private db: Db;
    constructor(db: Db) {
        this.db = db;
    }

    selectByEmailAndPassword = async (email: string, password: string) => {
        return await this.db.collection("users").findOne({ "userEmail": email, "password": password });
    }

    selectByEmail = async (email: string) => {
        return await this.db.collection("users").findOne({ "userEmail": email});
    }

    insertOne = async (email: string, password: string) => {
        return await this.db.collection("users").insertOne({ "userEmail": email, "password": password });
    }

    updateOne = async (email: string, password: string) => {
        return await this.db.collection("users").insertOne({ "userEmail": email, "password": password });
    }
} 
