import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from '../images/CloudinaryService';
import { InMemoryUsersRepository } from './repositories/InMemoryUsersRepository';
import { UsersRepository } from './repositories/UsersRepository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: UsersRepository, useClass: InMemoryUsersRepository },
        CloudinaryService
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
