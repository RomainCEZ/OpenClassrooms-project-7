import { nanoid } from 'nanoid'
import { UserProps } from '../interfaces/UserProps'

export class User {
    readonly id: string
    readonly email: string
    readonly username: string
    readonly password: string
    readonly role: string
    readonly timestamp: number

    constructor({ id, email, username, password, role, timestamp }: UserProps) {
        this.id = id
        this.email = email
        this.username = username
        this.password = password
        this.role = role
        this.timestamp = timestamp
    }

    public static create({ id, email, username, password, role }: UserProps) {
        return new User({
            id: id || nanoid(),
            email,
            username,
            password,
            role: role || "user",
            timestamp: Date.now()
        })
    }
}
