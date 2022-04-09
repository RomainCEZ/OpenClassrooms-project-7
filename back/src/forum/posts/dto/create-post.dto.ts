export class CreatePostDto {
    id: string
    title: string
    content: string
    imageName?: string
    author: string
    authorId: string
    timestamp?: number
}
