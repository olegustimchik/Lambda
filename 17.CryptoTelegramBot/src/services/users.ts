import { UsersRepository } from "../repositories/users.ts";
export class UsersService {
    private usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    selectAll = async () => {
        return this.usersRepository.selectAll();
    }

    getById = async (id: number) => {
        return this.usersRepository.getById(id);
    }

    getByTelegramId = async (telegramId: number) => {
        return this.usersRepository.getByTelegramId(telegramId); 
    }

    insertOne = async (telegramId: number) => {
       return this.usersRepository.insertOne(telegramId);
    }
}