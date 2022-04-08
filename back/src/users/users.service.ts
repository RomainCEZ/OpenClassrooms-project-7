import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Email } from './entities/Email.entity';
import { User } from './entities/User';
import { UserPassword } from './entities/UserPassword.entity';
import { IUsersRepository } from './interfaces/UsersRepository.interface';
import { UsersRepository } from './repositories/UsersRepository';

@Injectable()
export class UsersService {
    constructor(
        @Inject(UsersRepository) private usersRepository: IUsersRepository,
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
        return this.usersRepository.updateRole(id, updateUserDto)
    }

    remove(id: string) {
        return `This action removes a #${id} user`;
    }
}
