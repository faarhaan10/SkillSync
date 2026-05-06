import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

@Service()
export class UserRepository {
    private repo = AppDataSource.getRepository(User);

    async create(data: Partial<User>) {
        return await this.repo.save(data);
    }

    async findAll() {
        return await this.repo.find();
    }

    async findByEmail(email: string) {
        return await this.repo.findOne({ where: { email }, select: ["id", "email", "password", "firstName", "lastName"] });
    }
}
