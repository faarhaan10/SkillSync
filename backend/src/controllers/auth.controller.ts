import { Body, JsonController, Post } from "routing-controllers";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { Service } from "typedi";
import { LoginUserDTO, RegisterUserDTO } from "../dtos/user.dto";


@JsonController("/auth")
@Service()

export class AuthController {
    constructor(private userService: UserService) { }

    @Post("/register")
    async register(@Body() user: RegisterUserDTO) {
        return await this.userService.createUser(user);
    }

    @Post("/login")
    async login(@Body() user: LoginUserDTO) {
        return await this.userService.login(user.email, user.password);
    }
}

