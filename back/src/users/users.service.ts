import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Email } from './entities/Email.entity';
import { User } from './entities/User';
import { UserPassword } from './entities/UserPassword.entity';
import { IUsersRepository } from './interfaces/UsersRepository.interface';
import { UsersRepository } from './repositories/UsersRepository';
import { CloudinaryService } from '../images/CloudinaryService';

@Injectable()
export class UsersService {
    constructor(@Inject(UsersRepository) private usersRepository: IUsersRepository,
        private cloudinaryService: CloudinaryService) { }

    async createUser(createUserDto: CreateUserDto) {
        const user = User.create({
            email: Email.create(createUserDto.email).email,
            username: createUserDto.username,
            password: UserPassword.createHash(createUserDto.password)
        })
        return await this.usersRepository.saveUser(user)
    }

    async saveUser(user: User) {
        return await this.usersRepository.saveUser(user)
    }

    async findByEmail(email: string) {
        return await this.usersRepository.getByEmail(email.toLowerCase())
    }

    async findById(id: string) {
        return await this.usersRepository.getById(id)
    }

    async getProfile(id: string) {
        const user = await this.usersRepository.getById(id)
        const profile = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            timestamp: user.timestamp,
            profilePicture: user.profilePicture,
            postsCount: user.postsCount,
            commentsCount: user.commentsCount,
            favorites: user.favorites
        }
        return profile
    }
    async changeProfilePicture(userId: string, profilePicture: string) {
        const uploadResponse = await this.cloudinaryService.uploadImage(userId, profilePicture)
        await this.usersRepository.updateUser(userId, { profilePicture: uploadResponse.secure_url })
        return uploadResponse.secure_url
    }

    async updateFavorites(userId: string, postId: string) {
        const user = await this.usersRepository.getById(userId)
        const favorites = user.favorites.include(postId) ? user.favorites.filter(favorite => favorite !== postId) : { ...user.favorites, postId }
        await this.usersRepository.updateUser(userId, favorites)
        return favorites
    }

    async changePassword(userId: string, newPassword: string) {
        await this.usersRepository.updateUser(userId, { password: newPassword })
    }

    async changeUsername(userId: string, newUsername: string) {
        const userNameTaken = await this.usersRepository.findByUsername(userId, newUsername)
        if (userNameTaken) {
            throw new ConflictException("Ce nom d'utilisateur est déjà pris !")
        }
        await this.usersRepository.updateUser(userId, newUsername)
        return newUsername
    }

    async disableAccount(id: string) {
        await this.usersRepository.disableAccount(id)
    }
}
