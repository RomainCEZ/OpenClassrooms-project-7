import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersData } from '../data/Users';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/User';
// import { UpdateUserDto } from '../dto/update-user.dto';
import { IUsersRepository } from '../interfaces/UsersRepository.interface';

@Injectable()
export class InMemoryUsersRepository implements IUsersRepository {
    data: User[]
    constructor() {
        this.data = UsersData
    }
    updateRole(id: string, updateUserDto: UpdateUserDto) {
        throw new Error('Method not implemented.');
    }

    saveUser(user: User) {
        this.isUnique(user)
        this.data.push(user)
    }

    getByEmail(email: string): User {
        const user = this.data.find(user => user.email === email)
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable !")
        }
        return user
    }

    getById(id: string): User {
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
