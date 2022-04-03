export class CreatePostDto {
    id: string
    title: string
    body: string
    imageName?: string
    author: string
    authorId: string
    timestamp?: number
}
