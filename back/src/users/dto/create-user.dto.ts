import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import { LoginUserDto } from './login-user.dto'

export class CreateUserDto extends LoginUserDto {

    @IsNotEmpty({ message: "Vous devez choisir un nom d'utilisateur !" })
    @IsString()
    @Length(3, 50, { message: "Votre nom d'utilisateur doit contenir entre 3 et 50 charactères !" })
    @Matches(new RegExp(/^[0-9-'\s\p{L}\p{M}]+$/mui), { message: "Votre nom d'utilisateur ne peut contenir que des charactères alphanumériques !" })
    username: string
}
