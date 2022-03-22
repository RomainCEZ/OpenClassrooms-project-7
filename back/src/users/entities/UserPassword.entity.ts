import * as bcrypt from 'bcrypt'

export class UserPassword {
    password: string

    constructor(password: string) {
        this.password = password
    }

    get value() {
        return this.password
    }

    public static createHash(password: string): string {
        return new UserPassword(UserPassword.hash(password)).password
    }

    public static createPlainText(password: string): UserPassword {
        return new UserPassword(password)
    }

    private static hash(password: string): string {
        return bcrypt.hashSync(password, 10)
    }

    static isEqual(plainText: string, hash: string): boolean {
        return bcrypt.compareSync(plainText, hash)
    }
}