import { MongoClient, MongoAPIError, ConnectOptions, Db, Collection } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default class UserDBModel {
    private client: MongoClient;

    constructor() {
        this.client = new MongoClient(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/");
    }

    async checkUserInDB(userEmail: string, password: string): Promise<boolean> {
        let flag = false;
        try {
            await this.client.connect();
            const database = await this.client.db("jwt_users");
            const usersCollection = await database.collection("users");
            const user = await usersCollection.findOne({ "userEmail": userEmail, "password": password }).catch((err) => { console.log(err) });

            if (user !== null) {
                flag = true;
            }
        } catch (e) {
            console.log(e);
            flag = false;
        } finally {
            await this.client.close();
            return flag;
        }
    }

    async insertNewUserInDB(userEmail: string, password: string, requestsCount: number = 0): Promise<boolean> {
        let flag = false;
        try {
            await this.client.connect();
            const database = await this.client.db("jwt_users");
            const usersCollection = await database.collection("users");
            await usersCollection.insertOne({ "userEmail": userEmail, "password": password, "requestsCount": requestsCount }).catch((err) => { flag = false });
        } catch (e) {
            console.log(e);
            flag = false;
        } finally {
            await this.client.close();
            return flag;
        }
    }
    /**
     * Update user by email. Email is unique to each user
     * @param userEmail user email - this is search filter
     * @param password  user password - new password
     * @param requestsCount number of requests
     * @returns boolean. Return false if some issue occurred 
     */
    async updateUser(userEmail: string, password: string, requestsCount: number | 0): Promise<boolean> {
        let flag = false;
        try {
            await this.client.connect();
            const database = this.client.db("jwt_users");
            const usersCollection = await database.collection("users");
            const user = await usersCollection.updateOne({ "userEmail": userEmail }, { $set: { "password": password, "requestsCount": requestsCount } }).then((value) => flag = true).catch((err) => {
                console.log(err);
                flag = false;
            });
        } catch (e) {
            console.log(e);
            flag = false;
        } finally {
            await this.client.close();
            return flag;
        }
    }
    /**
     * 
     * @param userEmail user email - this is search filter
     * @returns number of requests.
     */
    async getUserRequests(userEmail: string): Promise<number> {
        let count = 0;
        try {
            await this.client.connect();
            const database = this.client.db("jwt_users");
            const usersCollection = await database.collection("users");
            const user = await usersCollection.findOne({ "userEmail": userEmail });
            if (user !== null) {
                count = user.requestsCount;
            }
        } catch (e) {
            count = 0;
            console.log(e); 
        } finally {
            await this.client.close();
            return count;
        };
    }
    /**
     * 
     * @param userEmail user email - this is search filter
     * @param requestsCount updated requests count
     * @returns true if user is updated else false
     */
    async updateUserRequests(userEmail: string, requestsCount: number | 0): Promise<boolean> {
        let flag = false;
        try {
            await this.client.connect();
            const database = this.client.db("jwt_users");
            const usersCollection = await database.collection("users");
            const user = await usersCollection.updateOne({ "userEmail": userEmail }, { $set: { "requestsCount": requestsCount } }).then((value) => flag = true).catch((err) => {
                console.log(err);
                flag = false;
            });
        } catch (e) {
            console.log(e);
            flag = false;
        } finally {
            await this.client.close();
            return flag;
        }
    }


} 
