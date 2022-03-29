import { nanoid } from "nanoid";
import { PostProps } from "../interfaces/PostProps";

export class Post {
    id: string;
    title: string;
    body: string;
    imageName?: string;
    userId: string;
    
    constructor({ id, title, body, imageName, userId }: PostProps) {
        this.id = id
        this.title = title
        this.body = body
        this.imageName = imageName
        this.userId = userId
    }

    public static create({ id, title, body, imageName, userId }: PostProps) {
        return new Post({
            id: id || nanoid(),
            title,
            body,
            imageName,
            userId
        })
    }
}
