import { IsEmail, IsNotEmpty, Length, Matches, MaxLength } from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty({ message: "Vous devez saisir une adresse email !" })
    @IsEmail({}, { message: "Vous devez saisir une adresse email valide !" })
    @MaxLength(100, { message: "Votre adresse email ne doit pas dépasser 100 charactères !" })
    email: string

    @IsNotEmpty({ message: "Vous devez choisir un nom d'utilisateur !" })
    @Length(3, 50, { message: "Votre nom d'utilisateur doit contenir entre 3 et 50 charactères !" })
    @Matches(new RegExp(/^[0-9-'\s\p{L}\p{M}]+$/mui), { message: "Votre nom d'utilisateur ne peut contenir que des charactères alphanumériques !" })
    username: string

    @IsNotEmpty({ message: "Vous devez choisir un mot de passe !" })
    @Length(8, 100, { message: "Votre mot de passe doit contenir entre 8 et 100 charactères !" })
    // @Matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), { message: "Votre mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre !" })
    password: string
}
