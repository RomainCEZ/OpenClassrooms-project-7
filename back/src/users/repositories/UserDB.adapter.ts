import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { CommentModel } from "../../Database/sequelizeModels/Comment.model";
import { PostModel } from "../../Database/sequelizeModels/Post.model";
import { UserModel } from "../../Database/sequelizeModels/User.model";
import { User } from "../entities/User";
import { IUsersRepository } from "../interfaces/UsersRepository.interface";

@Injectable()
export class UserDBadapter implements IUsersRepository {
    constructor(
        @InjectModel(UserModel) private readonly userModel: typeof UserModel,
        @InjectModel(PostModel) private readonly postModel: typeof PostModel,
        @InjectModel(CommentModel) private readonly commentModel: typeof CommentModel
    ) { }

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
        const user = await this.userModel.findOne<UserModel>({
            where: { email, isActive: true },
            include: [
                { model: PostModel, attributes: [], where: { isPublished: true }, required: false },
                { model: CommentModel, attributes: [], where: { isPublished: true }, required: false }
            ],
            attributes: {
                include: [
                    [Sequelize.fn('COUNT', Sequelize.col('posts')), 'postsCount'],
                    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('comments'))), 'commentsCount'],
                ],
            },
            group: ['UserModel.id']
        });
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        return User.create({
            id: user.userId,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
            timestamp: user.timestamp,
            profilePicture: user.profilePicture,
            postsCount: user.getDataValue('postsCount') / user.getDataValue('commentsCount'),
            commentsCount: user.getDataValue('commentsCount'),
        })

    }
    async getById(id: string): Promise<User> {
        const user = await this.userModel.findOne<UserModel>({
            where: { userId: id, isActive: true },
            include: [
                { model: PostModel, attributes: [], where: { isPublished: true }, required: false },
                { model: CommentModel, attributes: [], where: { isPublished: true }, required: false }
            ],
            attributes: {
                include: [
                    [Sequelize.fn('COUNT', Sequelize.col('posts')), 'postsCount'],
                    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('comments'))), 'commentsCount'],
                ],
            },
            group: ['UserModel.id']
        });
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        return User.create({
            id: user.userId,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
            timestamp: user.timestamp,
            profilePicture: user.profilePicture,
            postsCount: user.getDataValue('postsCount') / user.getDataValue('commentsCount'),
            commentsCount: user.getDataValue('commentsCount'),
        })
    }
    async updateProfileImage(userId: string, profilePictureUrl: string) {
        const user = await this.userModel.findOne({ where: { userId } })
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        user.update({ profilePicture: profilePictureUrl })

    }
    async changePassword(id: string, password: string) {
        const user = await this.userModel.findOne<UserModel>({ where: { userId: id } });
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        await user.update({ password })
    }
    async disableAccount(id: string) {
        const user = await this.userModel.findOne<UserModel>({ where: { userId: id } });
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        await user.update({ isActive: false })
    }
}
