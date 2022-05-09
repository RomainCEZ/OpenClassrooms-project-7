export default interface CommentProps {
    id?: string
    postId?: string
    postTitle?: string
    content: string
    author: string
    authorId: string
    timestamp?: number
    likes?: string[]
    dislikes?: string[]
}