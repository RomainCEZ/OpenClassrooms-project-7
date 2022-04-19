/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../entities/User";
import { IUsersRepository } from "../interfaces/UsersRepository.interface";

export class UsersRepository implements IUsersRepository {
    data?: User[];
    changePassword(id: string, password: string) {
        throw new Error("Method not implemented.");
    }
    saveUser(): void {
        throw new Error("Method not implemented.");
    }
    getByEmail(): User {
        throw new Error("Method not implemented.");
    }
    getById(): User {
        throw new Error("Method not implemented.");
    }
}