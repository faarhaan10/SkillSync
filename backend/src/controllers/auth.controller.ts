import { Body, JsonController, Post } from "routing-controllers";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { Service } from "typedi";


@JsonController("/auth")
@Service()

export class AuthController {
    constructor(private userService: UserService) { }

    @Post("/register")
    async register(@Body() user: Partial<User>) {
        return await this.userService.createUser(user);
    }

    @Post("/login")
    async login(@Body() user: Partial<User>) {
        return await this.userService.login(user.email!, user.password!);
    }
}

