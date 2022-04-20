import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../../Database/sequelizeModels/User.model";
import { User } from "../entities/User";
import { IUsersRepository } from "../interfaces/UsersRepository.interface";

@Injectable()
export class UserDBadapter implements IUsersRepository {
    constructor(@InjectModel(UserModel) private readonly userModel: typeof UserModel) { }
    data?: User[];

    async saveUser(user: User): Promise<void> {
        const emailAlreadyRegistered = await this.userModel.findOne<UserModel>({ where: { email: user.email } });
        if (emailAlreadyRegistered) {
            throw new ConflictException("Utilisateur déjà enregistré !")
        }
        const userNameTaken = await this.userModel.findOne<UserModel>({ where: { username: user.username } });
        if (userNameTaken) {
            throw new ConflictException("Ce nom d'utilisateur est déjà pris !")
        }
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
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
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
        const user = await this.userModel.findOne<UserModel>({ where: { userId: id } });
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        return User.create({
            id: user.userId,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
            timestamp: user.timestamp
        })

    }
    async changePassword(id: string, password: string) {
        const user = await this.userModel.findOne<UserModel>({ where: { userId: id } });
        if (user) {
            await user.update({ password })
        }
        throw new NotFoundException("Utilisateur introuvable !")
    }
}
