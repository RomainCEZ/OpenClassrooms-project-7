import { UserModel } from "../../Database/sequelizeModels/User.model";
import { User } from "../entities/User";

export interface IUsersRepository {
    saveUser(user: User)

    getByEmail(email: string)

    getById(id: string)

    updateUser(userId: string, params)

    findByUsername(userId: string, newUsername: string): Promise<UserModel>

    disableAccount(id: string)
}