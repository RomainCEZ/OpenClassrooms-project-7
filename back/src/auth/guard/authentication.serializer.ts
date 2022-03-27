import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "../../users/entities/User";

@Injectable()
export class AuthenticationSezializer extends PassportSerializer {
    serializeUser(user: User, done: (err: Error, user: User) => void) {
        done(null, user)
    }
    deserializeUser(user: User, done: (err: Error, user: User) => void ) {
        done(null, user)
    }
}