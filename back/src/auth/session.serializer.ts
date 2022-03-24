import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSezializer extends PassportSerializer {
    serializeUser(user: any, done: (err: Error, user: any) => void) {
        done(null, { id: user.id })
    }
    deserializeUser(payload: any, done: (err: Error, payload: string) => void ) {
        // const username = this.userService.findById(payload.id)
        done(null, payload)
    }
}