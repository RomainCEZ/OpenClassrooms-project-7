import { UpdatePostDto } from "../dto/update-post.dto"
import { Post } from "../entities/post.entity"

export interface IPostsRepository {
    getAllPosts(): Promise<Post[]>

    savePost(postData: Post): Promise<void>

    getById(postId: string): Promise<Post>

    getByAuthorId(userId: string): Promise<Post[]>

    update(postId: string, updatePostDto: UpdatePostDto): Promise<void>

    delete(postId: string): Promise<void>
}