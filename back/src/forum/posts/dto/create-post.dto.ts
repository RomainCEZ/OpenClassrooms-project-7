import { IsNotEmpty, MaxLength } from "class-validator"

export class CreatePostDto {
    id: string

    @IsNotEmpty({ message: "Vous devez saisir un titre !" })
    @MaxLength(255, { message: "Le titre ne peut pas contenir plus de 255 charactères !" })
    title: string
    content: string
    imageName?: string
    author: string
    authorId: string
    timestamp?: number
}
