import "reflect-metadata";
import { AppDataSource } from "./data-source"
import express from "express"
import * as dotenv from "dotenv"
import { User } from "./entities/user.entity"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

AppDataSource.initialize().then(async () => {

    console.log("Database connected")

    app.get("/users", async (req, res) => {
        const users = await AppDataSource.manager.find(User)
        res.json(users)
    })

    app.post("/users", async (req, res) => {
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" })
        }

        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName) {
            return res.status(400).json({ error: "firstName and lastName are required" })
        }

        const user = new User()
        user.firstName = firstName
        user.lastName = lastName
        user.email = email
        user.password = password

        try {
            const result = await AppDataSource.manager.save(user);
            console.log('User saved:', result);
            // We manually add fullName to the response since getters aren't enumerable by default
            res.json({ ...result, fullName: user.fullName })
        } catch (error) {
            console.error('Error saving user:', { error });
            res.status(500).json({
                error: error.detail || "Internal Server Error",
                query: error.query,
                parameters: error.parameters,
                success: false
            })
        }
    })


    app.get("/", (req, res) => {
        res.send("SkillSync Backend Running!")
    })

    app.listen(port, () => {
        console.log(`--############--Server is running on port http://localhost:${port}/ --############--`)
    })

}).catch(error => console.log(error))
