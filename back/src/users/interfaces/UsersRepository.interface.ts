import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/User";

export interface IUsersRepository {
    data?: User[]
    // getAllUsers(): UserData[]

    saveUser(user: User)

    getByEmail(email: string)

    getById(id: string)

    updateRole(id: string, updateUserDto: UpdateUserDto)

}