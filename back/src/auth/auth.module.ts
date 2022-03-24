import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { SessionSezializer } from './session.serializer';

@Module({
    imports: [UsersModule, PassportModule, PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSezializer]
})
export class AuthModule {
    constructor(private usersService: UsersService) {}
}
