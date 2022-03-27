import { User } from "../entities/User";

export interface UsersRepository {

    // getAllUsers(): UserData[]

    saveUser(user: User): void

    getByEmail(email: string): User 

    getById(id: string): User

}