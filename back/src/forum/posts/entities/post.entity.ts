import { nanoid } from "nanoid";
import { PostProps } from "../interfaces/PostProps";

export class Post {
    id: string;
    title: string;
    content: any;
    imageName?: string;
    author: string;
    authorId: string;
    timestamp: number

    constructor({ id, title, content, imageName, author, authorId, timestamp }: PostProps) {
        this.id = id
        this.title = title
        this.content = content
        this.imageName = imageName
        this.author = author
        this.authorId = authorId
        this.timestamp = timestamp
    }

    public static create({ id, title, content, imageName, author, authorId, timestamp }: PostProps) {
        return new Post({
            id: id || nanoid(),
            title,
            content: content || null,
            imageName: imageName || null,
            author,
            authorId,
            timestamp: timestamp || Date.now()
        })
    }
}
