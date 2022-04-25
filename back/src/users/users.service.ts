import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Email } from './entities/Email.entity';
import { User } from './entities/User';
import { UserPassword } from './entities/UserPassword.entity';
import { IUsersRepository } from './interfaces/UsersRepository.interface';
import { UsersRepository } from './repositories/UsersRepository';

@Injectable()
export class UsersService {
    constructor(
        @Inject(UsersRepository) private usersRepository: IUsersRepository,
    ) { }

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
        const profilePicture = user.profilePicture ? `${process.env.DOMAIN_ADDRESS}/${process.env.IMAGE_FOLDER}/${user.profilePicture}` : ""
        const profile = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            timestamp: user.timestamp,
            profilePicture,
            postsCount: user.postsCount,
            commentsCount: user.commentsCount
        }
        return profile
    }
    async changeProfilePicture(userId: string, imageName: string) {
        // if (imageName) {
        //     fs.unlink(`./${process.env.IMAGE_FOLDER}/${imageName}`, error => {
        //         if (error) {
        //             throw new Error(`${error}`)
        //         }
        //     })
        // }
        return "Not implemented"
    }
    async changePassword(userId: string, newPassword: string) {
        await this.usersRepository.changePassword(userId, newPassword)
    }

    async disableAccount(id: string) {
        await this.usersRepository.disableAccount(id)
    }
}
