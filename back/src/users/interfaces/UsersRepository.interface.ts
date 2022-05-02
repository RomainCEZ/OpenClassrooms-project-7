import { User } from "../entities/User";

export interface IUsersRepository {
    updateProfileImage(userId: string, profilePictureUrl: string)

    saveUser(user: User)

    getByEmail(email: string)

    getById(id: string)

    changePassword(id: string, password: string)

    changeUsername(userId: string, newUsername: string): Promise<{ newUsername: string }>

    disableAccount(id: string)
}