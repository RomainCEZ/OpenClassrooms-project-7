import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guard/local.strategy';
import { UsersRepository } from '../users/repositories/UsersRepository';
import { InMemoryUsersRepository } from '../users/repositories/InMemoryUsersRepository';
import { UsersService } from '../users/users.service';
import { MailerService } from '../utils/MailerService/MailerService';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: process.env.TOKEN_SECRET, signOptions: { expiresIn: '900s' } }), PassportModule],
      providers: [AuthService, LocalStrategy,
        { provide: UsersRepository, useClass: InMemoryUsersRepository },
        UsersService,
        MailerService,
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
