import request from "supertest";
import { app } from "../../app";

describe("Create user contro", () => {

    it("Should be able to create a new user", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                username: "teste-integration",
                email: "testintegration@test.com",
                name: "Test Integration"
            })

        console.log(response.status)
    })
})