export class CreatePostDto {
    id: string
    title: string
    content: string
    author: string
    authorId: string
    timestamp?: number
    likes?: string[]
    dislikes?: string[]
}
