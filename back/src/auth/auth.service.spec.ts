import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guard/local.strategy';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/repositories/UsersRepository';
import { InMemoryUsersRepository } from '../users/repositories/InMemoryUsersRepository';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, PassportModule],
      providers: [AuthService, LocalStrategy,
        { provide: UsersRepository, useClass: InMemoryUsersRepository }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
