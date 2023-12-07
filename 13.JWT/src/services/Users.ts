import { MongoClient, MongoAPIError, ConnectOptions, Db, Collection } from "mongodb";
import UsersRepository from "src/repositories/Users.ts";

export default class UsersService {
    private repository: UsersRepository;  
    constructor(repository: UsersRepository) {
       this.repository = repository;
    }

    selectByEmailAndPassword = async (email: string, password: string) => {
        return this.repository.selectByEmailAndPassword(email, password);
    }

    selectByEmail = async (email: string) => {
        return this.repository.selectByEmail(email);
    }

    insertOne = async (email: string, password: string) => {
        return this.repository.insertOne(email, password);
    }

    updateOne = async (email: string, password: string) => {
        return this.repository.updateOne(email, password);
    }
} 
