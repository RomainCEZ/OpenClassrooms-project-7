import { User } from "../entities/User";

export interface IUsersRepository {
    data?: User[]
    // getAllUsers(): UserData[]

    saveUser(user: User)

    getByEmail(email: string)

    getById(id: string)

}