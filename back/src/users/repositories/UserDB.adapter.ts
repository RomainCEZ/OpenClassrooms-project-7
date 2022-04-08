import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../../Database/sequelizeModels/User.model";
import { User } from "../entities/User";
import { IUsersRepository } from "../interfaces/UsersRepository.interface";

@Injectable()
export class UserDBadapter implements IUsersRepository {
    constructor(@InjectModel(UserModel) private readonly userModel: typeof UserModel) { }

    async saveUser(user: User): Promise<void> {
        await this.userModel.create<UserModel>({
            userId: user.id,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
            timestamp: user.timestamp
        })
    }
    async getByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne<UserModel>({ where: { email } });
        return User.create({
            id: user.userId,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
            timestamp: user.timestamp
        })
    }
    async getById(id: string): Promise<User> {
        const user = await this.userModel.findOne<UserModel>({ where: { id } });
        return User.create({
            id: user.userId,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
            timestamp: user.timestamp
        })
    }
}
