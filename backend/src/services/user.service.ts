import { Service } from "typedi";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";
import { comparePassword, generateToken, hashPassword } from "../utils/auth.util";

@Service()
export class UserService {
    // Dependency Injection: typedi automatically provides the UserRepository
    constructor(private userRepository: UserRepository) { }

    async createUser(data: Partial<User>) {
        if (data.password) {
            data.password = await hashPassword(data.password);
        }

        return await this.userRepository.create(data);
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    // login
    async login(email: string, password: string) {
    // 1. Find the user (we need a findByEmail in our repo!)
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // 2. Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    // 3. Generate Token
    const token = generateToken(user.id);
    return { user, token };
  }
}
