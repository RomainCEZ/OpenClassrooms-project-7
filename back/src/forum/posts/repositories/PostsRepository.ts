import { UpdatePostDto } from "../dto/update-post.dto";
import { Post } from "../entities/post.entity";
import { IPostsRepository } from "../interfaces/PostsRepository";

export class PostsRepository implements IPostsRepository {
    getAllPosts(): Post[] | Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    savePost(postData: Post) {
        throw new Error("Method not implemented.");
    }
    getById(postId: string): Post | Promise<Post> {
        throw new Error("Method not implemented.");
    }
    update(postId: string, updatePostDto: UpdatePostDto) {
        throw new Error("Method not implemented.");
    }
    delete(postId: string) {
        throw new Error("Method not implemented.");
    }

}