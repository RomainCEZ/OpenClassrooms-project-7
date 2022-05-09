import { nanoid } from "nanoid";
import CommentProps from "../interfaces/CommentProps";

export class Comment implements CommentProps {
    readonly id: string
    readonly postId?: string
    readonly postTitle?: string
    readonly content: string
    readonly author: string
    readonly authorId: string
    readonly timestamp: number
    readonly likes: string[]
    readonly dislikes: string[]

    constructor({ id, postId, postTitle, content, author, authorId, timestamp, likes, dislikes }: CommentProps) {
        this.id = id
        this.postId = postId
        this.postTitle = postTitle
        this.content = content
        this.author = author
        this.authorId = authorId
        this.timestamp = timestamp
        this.likes = likes
        this.dislikes = dislikes
    }

    static create(comment: CommentProps) {
        return new Comment({
            ...comment,
            id: comment.id || nanoid(),
            timestamp: comment.timestamp || Date.now(),
            likes: comment.likes || [],
            dislikes: comment.dislikes || []
        })
    }
}
