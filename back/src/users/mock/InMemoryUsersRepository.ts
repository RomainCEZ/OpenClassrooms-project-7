import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersData } from '../data/Users';
import { User } from '../entities/User.entity';
import { UserData } from '../interfaces/User.interface';
// import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../interfaces/UsersRepository.interface';

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
    data: UserData[]
    constructor() {
        this.data = UsersData
    }

    saveUser(user: User) {
        this.isUnique(user)
        this.data.push({
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password
        })
    }
    
    getByEmail(email: string): UserData {
        const user = this.data.find(user => user.email === email)
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        return user
    }
    
    getById(id: string): UserData {
        const user = this.data.find(user => user.id === id)
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        return user
    }

    private isUnique(newUser: User) {
        const emailExists = this.data.find(user => user.email === newUser.email)
        const usernameExists = this.data.find(user => user.username === newUser.username)
        if (emailExists) {
            throw new HttpException('Cet email est déjà enregistré !', 409)
        }
        if (usernameExists) {
            throw new HttpException("Cet nom d'utilisateur existe déjà !", 409)
        }
    }
}
