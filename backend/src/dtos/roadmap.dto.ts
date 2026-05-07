import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateRoadmapDto {
  @IsString()
  @MinLength(3, { message: "Title must be at least 3 characters long" })
  @MaxLength(50, { message: "Title is too long" })
  title!: string;

  @IsString()
  @MinLength(10, { message: "Description must be at least 10 characters long" })
  description!: string;
}
