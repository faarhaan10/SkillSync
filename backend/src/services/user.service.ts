import { Service } from "typedi"; 
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";

@Service()
export class UserService {
  // Dependency Injection: typedi automatically provides the UserRepository
  constructor(private userRepository: UserRepository) {}

  async createUser(data: Partial<User>) {
    // Business logic would go here (e.g. password hashing)
    return await this.userRepository.create(data);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
