import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { Email } from '../users/entities/Email.entity';
import { User } from '../users/entities/User';
import { UserPassword } from '../users/entities/UserPassword.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email.toLowerCase());
        const passwordIsValid = this.verifyPassword(UserPassword.createPlainText(password).password, user.password)
        if (user && passwordIsValid) {
            const { password, email, ...userInfo } = user;
            return userInfo;
        }
        return null;
    }
    createSession(loginUserDto: LoginUserDto) {
        const user = this.usersService.findByEmail(loginUserDto.email.toLowerCase())
        this.verifyPassword(UserPassword.createPlainText(loginUserDto.password).password, user.password)
        return { userId: user.id, username: user.username }
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = User.create({
            email: Email.create(createUserDto.email).email,
            username: createUserDto.username,
            password: UserPassword.createHash(createUserDto.password)
        })
        return this.usersService.saveUser(user)
    }

    private verifyPassword(plainText: string, hash: string): boolean {
        const isEqual = UserPassword.isEqual(plainText, hash)
        if (!isEqual) {
            throw new UnauthorizedException('Mot de passe invalide !')
        }
        return true
    }
}
