import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { Email } from '../users/entities/Email.entity';
import { User } from '../users/entities/User';
import { UserPassword } from '../users/entities/UserPassword.entity';
import { UsersService } from '../users/users.service';
import { MailerService } from '../common/MailerService/MailerService';
import { ResetPasswordDto } from './dto/RestPasswordDto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/ChangePasswordDto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email.toLowerCase());
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        const passwordIsValid = this.verifyPassword(UserPassword.createPlainText(password).password, user.password)
        if (passwordIsValid) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, email, ...userInfo } = user;
            return userInfo;
        }
        return null;
    }
    async createSession(loginUserDto: LoginUserDto) {
        const user = await this.usersService.findByEmail(loginUserDto.email.toLowerCase())
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

    async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
        const user = await this.usersService.findById(userId)
        this.verifyPassword(UserPassword.createPlainText(changePasswordDto.currentPassword).password, user.password)
        await this.usersService.changePassword(userId, UserPassword.createHash(changePasswordDto.newPassword))
    }

    async sendPasswordRestEmail(email: string) {
        try {
            const user = await this.usersService.findByEmail(email)
            const resetToken = await this.createResetToken(user.id)
            await this.mailerService.sendPasswordRestEmail(user, resetToken)
        } catch (error) {
            console.log(error)
        }
    }
    async createResetToken(userId: string): Promise<string> {
        const token = this.jwtService.sign({ userId }, { secret: process.env.TOKEN_SECRET })
        await this.jwtService.verify(token, { secret: process.env.TOKEN_SECRET })
        return token
    }
    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        await this.verifyToken(resetPasswordDto.resetToken, resetPasswordDto.userId)
        const newPassword = UserPassword.createHash(resetPasswordDto.password)
        await this.usersService.changePassword(resetPasswordDto.userId, newPassword)
    }
    async verifyToken(token: string, userId: string): Promise<void> {
        try {
            const decodedUserId = this.jwtService.verify(token, { secret: process.env.TOKEN_SECRET })
            if (decodedUserId.userId !== userId) {
                throw ""
            }
        } catch (error) {
            throw new UnauthorizedException("Le lien a expiré ou est invalide !")
        }
    }
    async disableAccount(id: string) {
        await this.usersService.disableAccount(id)
    }
}
