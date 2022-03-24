import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Email } from './entities/Email.entity';
import { User } from './entities/User.entity';
import { UserPassword } from './entities/UserPassword.entity';
import { UsersRepository } from './interfaces/UsersRepository.interface';
import { InMemoryUsersRepository } from './mock/InMemoryUsersRepository';

@Injectable()
export class UsersService {
    constructor(
        @Inject(InMemoryUsersRepository) private usersRepository: UsersRepository,
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const user = User.create({
            email: Email.create(createUserDto.email).email,
            username: createUserDto.username,
            password: UserPassword.createHash(createUserDto.password)
        })
        return this.usersRepository.saveUser(user)
    }

    saveUser(user) {
        return this.usersRepository.saveUser(user)
    }

    findAll() {
        return `This action returns all users`;
    }

    findByEmail(email: string) {
        return this.usersRepository.getByEmail(email.toLowerCase())
    }

    findById(id: string) {
        return this.usersRepository.getById(id)
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} with ${updateUserDto}`;
    }

    remove(id: string) {
        return `This action removes a #${id} user`;
    }
}
