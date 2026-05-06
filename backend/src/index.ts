import "reflect-metadata";
import * as dotenv from "dotenv"
import { AppDataSource } from "./data-source"
import express from "express"
import { User } from "./entities/user.entity"
import { setupContainer } from "./config/container";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/user.controller";

dotenv.config()

// const app = express()
const port = process.env.PORT || 3000

// 1. Setup DI Container
setupContainer();
 

// step-2
AppDataSource.initialize().then(async () => {

    console.log("Data Source has been initialized!");

    // 3. Create Express Server with Routing Controllers
    const app = createExpressServer({
        cors: true, // Enable CORS if needed
        controllers: [UserController], // Register your controllers here
    });

    app.get("/", (req, res) => {
        res.send("SkillSync Backend Running with Clean Architecture!");

    })

    app.listen(port, () => {
        console.log(`--############--Server is running on port http://localhost:${port}/ --############--`)
    })

}).catch(error => console.log(error))
