import { User } from "../entities/User";

export interface UsersRepository {
    data: User[]
    // getAllUsers(): UserData[]

    saveUser(user: User): void

    getByEmail(email: string): User

    getById(id: string): User

}