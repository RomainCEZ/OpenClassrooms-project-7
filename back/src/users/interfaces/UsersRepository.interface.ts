import { User } from "../entities/User.entity";
import { UserData } from "./User.interface";

export interface UsersRepository {

    // getAllUsers(): UserData[]

    saveUser(user: User): void

    getByEmail(email: string): UserData 

}