import { nanoid } from 'nanoid'

interface UserProps {
    id?: string
    email: string
    username: string
    password: string
    role?: string
}

export class User {
    readonly id: string
    readonly email: string
    readonly username: string
    readonly password: string
    readonly role: string

    constructor({ id, email, username, password, role }: UserProps) {
        this.id = id
        this.email = email
        this.username = username
        this.password = password
        this.role = role
    }

    public static create({ id, email, username, password, role }: UserProps) {
        return new User({
            id: id || nanoid(),
            email,
            username,
            password,
            role: role || "user"
          })
    }
}
