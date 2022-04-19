import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guard/local.strategy';
import { AuthController } from './auth.controller';
import { SessionSezializer } from './guard/session.serializer';
import { MailerService } from '../common/MailerService/MailerService';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UsersModule, PassportModule.register({ session: true }), JwtModule.register({ secret: process.env.TOKEN_SECRET, signOptions: { expiresIn: '900s' } })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSezializer, MailerService],
})
export class AuthModule {
}
