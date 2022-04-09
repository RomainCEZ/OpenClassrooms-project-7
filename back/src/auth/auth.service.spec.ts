import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guard/local.strategy';
import { UsersRepository } from '../users/repositories/UsersRepository';
import { InMemoryUsersRepository } from '../users/repositories/InMemoryUsersRepository';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [AuthService, LocalStrategy,
        { provide: UsersRepository, useClass: InMemoryUsersRepository },
        UsersService
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
