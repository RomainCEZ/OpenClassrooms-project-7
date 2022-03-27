import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guard/local.strategy';
import { AuthController } from './auth.controller';
import { AuthenticationSezializer } from './guard/authentication.serializer';

@Module({
    imports: [UsersModule, PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AuthenticationSezializer]
})
export class AuthModule {
    constructor(private usersService: UsersService) {}
}
