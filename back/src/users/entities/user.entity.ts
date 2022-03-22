import { nanoid } from 'nanoid'
// import { Email } from "./Email.entity";
// import { UserPassword } from './UserPassword.entity';

interface UserProps {
    id?: string
    email: string
    username: string
    password: string
}

export class User {
    readonly id: string
    readonly email: string
    readonly username: string
    readonly password: string

    constructor({ id, email, username, password }: UserProps) {
        this.id = id
        this.email = email
        this.username = username
        this.password = password
    }

    public static create({ id, email, username, password }: UserProps) {
        return new User({
            id: id || nanoid(),
            email,
            username,
            password
          })
    }
}
