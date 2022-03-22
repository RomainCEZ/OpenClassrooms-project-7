import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Email } from './entities/Email.entity';
import { User } from './entities/User.entity';
import { UserPassword } from './entities/UserPassword.entity';
import { UsersRepository } from './interfaces/UsersRepository.interface';
import { InMemoryUsersRepository } from './mock/InMemoryUsersRepository';

@Injectable()
export class UsersService {
    constructor(
        @Inject(InMemoryUsersRepository) private usersRepository: UsersRepository,
        @Inject (JwtService) private jwtService: JwtService
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const user = User.create({
            email: Email.create(createUserDto.email).email,
            username: createUserDto.username,
            password: UserPassword.createHash(createUserDto.password)
        })
        return this.usersRepository.saveUser(user)
    }

    createSession(loginUserDto: LoginUserDto) {
        const user = this.usersRepository.getByEmail(loginUserDto.email.toLowerCase())
        this.verifyPassword(UserPassword.createPlainText(loginUserDto.password).password, user.password)
        return { userId: user.id, token: this.jwtService.sign({userId: user.id, username: user.username}), username: user.username }
    }

    private verifyPassword(plainText: string, hash: string) {
        const isEqual = UserPassword.isEqual(plainText, hash)
        if (!isEqual) {
            throw new UnauthorizedException('Mot de passe invalide !')
        }
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: string) {
        return `This action returns a #${id} user`;
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} with ${updateUserDto}`;
    }

    remove(id: string) {
        return `This action removes a #${id} user`;
    }
}
