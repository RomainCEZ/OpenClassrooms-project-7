/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../entities/User";
import { IUsersRepository } from "../interfaces/UsersRepository.interface";

export class UsersRepository implements IUsersRepository {
    changeUsername(userId: string, newUsername: string): Promise<{ newUsername: string; }> {
        throw new Error("Method not implemented.");
    }
    updateProfileImage(userId: string, profilePictureUrl: string) {
        throw new Error("Method not implemented.");
    }
    disableAccount(id: string) {
        throw new Error("Method not implemented.");
    }
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