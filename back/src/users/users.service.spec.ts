import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from '../images/CloudinaryService';
import { InMemoryUsersRepository } from './repositories/InMemoryUsersRepository';
import { UsersRepository } from './repositories/UsersRepository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useClass: InMemoryUsersRepository },
        CloudinaryService
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
