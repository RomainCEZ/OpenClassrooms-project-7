import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "../../users/entities/User";
import { UsersService } from "../../users/users.service";

@Injectable()
export class SessionSezializer extends PassportSerializer {
    @Inject(UsersService) readonly usersService: UsersService
    serializeUser(user: User, done: (err: Error, userId: string) => void) {
        done(null, user.id)
    }
    async deserializeUser(userId: string, done: (err: Error, user: User) => void) {
        const user = await this.usersService.findById(userId)
        done(null, user)
    }
}