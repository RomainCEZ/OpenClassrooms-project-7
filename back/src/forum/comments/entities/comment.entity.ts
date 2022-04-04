import { nanoid } from "nanoid";
import CommentProps from "../interfaces/CommentProps";

export class Comment implements CommentProps {
    readonly id: string
    readonly content: string
    readonly author: string
    readonly authorId: string
    readonly timestamp: number

    constructor({ id, content, author, authorId, timestamp }: CommentProps) {
        this.id = id
        this.content = content
        this.author = author
        this.authorId = authorId
        this.timestamp = timestamp
    }

    static create(comment: CommentProps) {
        return new Comment({
            ...comment,
            id: comment.id || nanoid(),
            timestamp: comment.timestamp || Date.now()
        })
    }
}
