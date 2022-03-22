export class Email {
    readonly email: string
    constructor(email:string) {
        this.email = email
    }

    static create(email: string) {
        return new Email(email.toLowerCase())
    }
}