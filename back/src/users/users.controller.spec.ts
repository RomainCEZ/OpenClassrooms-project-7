import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryUsersRepository } from './mock/InMemoryUsersRepository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: process.env.JWT_TOKEN_SECRET, signOptions: { expiresIn: '24h' } })], //mettre une variable d'environnement
      controllers: [UsersController],
      providers: [UsersService, InMemoryUsersRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
