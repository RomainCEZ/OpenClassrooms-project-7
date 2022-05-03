/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdatePostDto } from "../dto/update-post.dto";
import { Post } from "../entities/post.entity";
import { IPostsRepository } from "../interfaces/PostsRepository";

export class PostsRepository implements IPostsRepository {
    async getAllPosts(): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    async savePost(postData: Post): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getById(postId: string): Promise<Post> {
        throw new Error("Method not implemented.");
    }
    async getByAuthorId(userId: string): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    async update(postId: string, updatePostDto: UpdatePostDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(postId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


}