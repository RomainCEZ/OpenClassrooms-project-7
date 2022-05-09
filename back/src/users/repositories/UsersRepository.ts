/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from "../../Database/sequelizeModels/User.model";
import { User } from "../entities/User";
import { IUsersRepository } from "../interfaces/UsersRepository.interface";

export class UsersRepository implements IUsersRepository {
    saveUser(user: User) {
        throw new Error("Method not implemented.");
    }
    getByEmail(email: string) {
        throw new Error("Method not implemented.");
    }
    getById(id: string) {
        throw new Error("Method not implemented.");
    }
    updateUser(userId: string, params: any) {
        throw new Error("Method not implemented.");
    }
    findByUsername(userId: string, newUsername: string): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }
    disableAccount(id: string) {
        throw new Error("Method not implemented.");
    }

}