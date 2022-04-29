export class CreateCommentDto {
    postId: string
    author: string
    authorId: string
    content: string
    likes?: string[]
    dislikes?: string[]
}
