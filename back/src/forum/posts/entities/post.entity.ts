import { nanoid } from "nanoid";
import { PostProps } from "../interfaces/PostProps";

export class Post {
    id: string;
    title: string;
    body: string;
    imageName?: string;
    author: string;
    authorId: string;
    timestamp?: number

    constructor({ id, title, body, imageName, author, authorId, timestamp }: PostProps) {
        this.id = id
        this.title = title
        this.body = body
        this.imageName = imageName
        this.author = author
        this.authorId = authorId
        this.timestamp = timestamp
    }

    public static create({ id, title, body, imageName, author, authorId, timestamp }: PostProps) {
        return new Post({
            id: id || nanoid(),
            title,
            body,
            imageName,
            author,
            authorId,
            timestamp: timestamp || Date.now()
        })
    }
}
