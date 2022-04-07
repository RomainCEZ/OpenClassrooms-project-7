import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/UsersRepository';
import { UserDBadapter } from './repositories/UserDB.adapter';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../Database/sequelizeModels/User.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: UsersRepository, useClass: UserDBadapter }
  ],
  exports: [UsersService]
})
export class UsersModule { }
