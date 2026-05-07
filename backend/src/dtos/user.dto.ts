import { IsEmail, IsString, MinLength } from "class-validator";


export class RegisterUserDTO {
    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsEmail({},{message:"Invalid Email Address"})
    email!: string;

    @IsString()
    @MinLength(6,{message:"Password must be Atleast 6 Characters Long"})
    password!: string;
}


export class LoginUserDTO { 
    @IsEmail({},{message:"Please provide a valid email address"})
    email!: string;

    @IsString()
    @MinLength(6,{message:"Password must be Atleast 6 Characters Long"})
    password!: string;
}