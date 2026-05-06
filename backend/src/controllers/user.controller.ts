import { JsonController, Get, Post, Body } from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity"; 

@JsonController("/users")
@Service() // Registering this so it can receive the UserService
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async getAll() {
    return await this.userService.getAllUsers();
  }

  @Post("/")
  async create(@Body() user: Partial<User>) {
    return await this.userService.createUser(user);
  }
}


