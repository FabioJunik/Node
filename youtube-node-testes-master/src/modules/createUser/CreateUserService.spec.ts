import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "./CreateUserService"

describe("Create User", () => {

    let usersRepository: IUsersRepository
    let createUserService: CreateUserService


    beforeAll(() => {
        usersRepository = new UsersRepositoryInMemory()
        createUserService = new CreateUserService(usersRepository)
    })

    it("should be able to create a new user", async () => {

        const userData: User = {
            name: "Test Name",
            email: "test@test.com",
            username: "testusername"
        }

        const user = await createUserService.execute(userData)

        console.log(user)

        expect(user).toHaveProperty("id")
    })

    it("should not be able to create an existing user", async () => {

        const userData: User = {
            name: "Test Existing Name",
            email: "testexisting@test.com",
            username: "testexistingusername"
        }

        await createUserService.execute(userData)

        await expect(createUserService.execute(userData)).rejects.toEqual(new Error("User already exists!"))


    })

})