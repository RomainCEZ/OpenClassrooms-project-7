import { PostInterface } from "../interfaces/postInterface";

export class Post implements PostInterface{
    id: string;
    title: string;
    body: string;
    imageUrl?: string;
    userId: string;
}
