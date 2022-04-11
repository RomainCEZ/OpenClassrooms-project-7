import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from 'class-validator'

export class LoginUserDto {

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100, { message: "Votre adresse email ne doit pas dépasser 100 charactères !" })
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 100, { message: "Votre mot de passe doit contenir entre 8 et 100 charactères !" })
    @Matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), { message: "Votre mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre !" })
    password: string
}
