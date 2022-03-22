import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersRepository } from './mock/InMemoryUsersRepository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_TOKEN_SECRET, signOptions: { expiresIn: '24h' } })], //mettre une variable d'environnement
  controllers: [UsersController],
  providers: [UsersService, 
    { provide: InMemoryUsersRepository, useClass: InMemoryUsersRepository }
  ]
})
export class UsersModule {}
