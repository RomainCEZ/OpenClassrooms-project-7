import { nanoid } from "nanoid";
import { PostProps } from "../interfaces/PostProps";

export class Post {
    id: string;
    title: string;
    content: any;
    imageName?: string;
    author: string;
    authorId: string;
    authorPicture?: string
    timestamp: number
    likes?: string[]
    dislikes?: string[]
    commentsNumber?: number

    constructor({ id, title, content, imageName, author, authorId, authorPicture, timestamp, likes, dislikes, commentsNumber }: PostProps) {
        this.id = id
        this.title = title
        this.content = content
        this.imageName = imageName
        this.author = author
        this.authorId = authorId
        this.authorPicture = authorPicture
        this.timestamp = timestamp
        this.likes = likes
        this.dislikes = dislikes
        this.commentsNumber = commentsNumber
    }

    public static create({ id, title, content, imageName, author, authorId, authorPicture, timestamp, likes, dislikes, commentsNumber }: PostProps) {
        return new Post({
            id: id || nanoid(),
            title,
            content: content || null,
            imageName: imageName || null,
            author,
            authorId,
            authorPicture,
            timestamp: timestamp || Date.now(),
            likes: likes || [],
            dislikes: dislikes || [],
            commentsNumber: commentsNumber || 0
        })
    }
}
