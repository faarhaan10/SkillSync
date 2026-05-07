import "reflect-metadata";
import * as dotenv from "dotenv"
import { AppDataSource } from "./data-source"
import express from "express"
import jwt from "jsonwebtoken"; 
import { User } from "./entities/user.entity"
import { setupContainer } from "./config/container";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/user.controller";
import { AuthController } from "./controllers/auth.controller";
import { authorizationChecker } from "./utils/auth.util";

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
        cors: true,
        controllers: [UserController, AuthController],
        // 🛡️ The Security Guard
        authorizationChecker: authorizationChecker,


        // 🛡️ Enable Validation
        validation:true,
        classTransformer:true,  
        development:true

    });

    app.get("/", (req, res) => {
        res.send("SkillSync Backend Running with Clean Architecture!");

    })

    app.listen(port, () => {
        console.log(`--############--Server is running on port http://localhost:${port}/ --############--`)
    })

}).catch(error => console.log(error))
