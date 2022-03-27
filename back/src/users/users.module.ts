import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersRepository } from './mock/InMemoryUsersRepository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, 
    { provide: InMemoryUsersRepository, useClass: InMemoryUsersRepository }
  ],
  exports: [UsersService]
})
export class UsersModule {}
