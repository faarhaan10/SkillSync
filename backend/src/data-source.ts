import "reflect-metadata"
import { DataSource } from "typeorm" 
import * as dotenv from "dotenv"
import { User } from "./entities/user.entity"
import { Profile } from "./entities/profile.entity"
import { Roadmap } from "./entities/roadmap.entity"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "test",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_DATABASE || "test",
    synchronize: true,
    logging: false,
    entities: [User, Profile, Roadmap],
    migrations: [],
    subscribers: [],
})
