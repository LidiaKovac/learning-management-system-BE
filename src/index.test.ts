require("dotenv").config()
const server = require("./server")
const request = require("supertest")(server)
const sequelize_t = require("./utils/config/db/sequelize")
import {get_token_from_cookies} from "./utils/tools/"

beforeAll(async () => {
	try {
		await sequelize_t.authenticate()
	} catch (error) {console.log("ERROR!", error)
	}
})

afterAll(async()=> {
    try {
        await sequelize_t.close()
    } catch (error) {
        console.log(error)
    }
})
let cookies = {}
describe("Stage 1: Testing public routes", () => {
	it("1. POST /login > should return a Logged in message when given valid credentials", async () => {
		const res = await request.post("/login").send({
			email: "test@test",
			password: "admin",
		}).expect({"message": "Logged in"})
        cookies = get_token_from_cookies(res.header["set-cookie"].toString()) 
	})
    it("2. POST /login/new > should return  400 when email is already in use", async()=> {
        const res = await request.post("/login/new").send({
            name: "Test",
            last_name: "Test",
            email: "test@test",
            role: "student",
            password: "admin",
            birthday: new Date(),
            pronouns: "they/them",
            profile_picture: "test"
        }).expect(400)

    })
})

describe("Stage 2: Testing admin routes", ()=> {
    it("1. GET /users/admin > should return 401 when trying to access without token", async()=> {
        await request.get("/user/admin").expect(401)
    })
    it("2. GET /users/admin > should return 403 when trying to access as a student", async()=> {
        console.log(cookies)
        let res = await request.get("/user/admin").set("authorization", `Bearer ${cookies}`).expect(403)
    })
})