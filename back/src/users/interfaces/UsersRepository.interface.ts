import { User } from "../entities/User";

export interface IUsersRepository {

    saveUser(user: User)

    getByEmail(email: string)

    getById(id: string)

    changePassword(id: string, password: string)

    disableAccount(id: string)
}