const server = require("./server")
const request = require("supertest")(server)

beforeAll(async () => {
	try {
		await sequelize.authenticate()
		console.log("Connection has been established successfully.")
	} catch (error) {
		console.error("Unable to connect to the database:", error)
	}
})

describe("Stage 1: Testing public routes", () => {
	/*
        1. POST login/new -> creates new user
        2. POST login/ -> login

    */
	it("POST /login/new > should return 201 when given a valid object", async () => {
		const res = await request.post("/login").send({
			email: "student@student",
			password: "admin",
		})
		expect(res).toBe(20)
	})
})
