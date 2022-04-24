import { IsNotEmpty, Length } from "class-validator"

export class ChangePasswordDto {

    @IsNotEmpty({ message: "Vous devez saisir votre mot de passe actuel !" })
    currentPassword: string

    @IsNotEmpty({ message: "Vous devez choisir un mot de passe !" })
    @Length(8, 100, { message: "Votre mot de passe doit contenir entre 8 et 100 charactères !" })
    // @Matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), { message: "Votre mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre !" })
    newPassword: string
}