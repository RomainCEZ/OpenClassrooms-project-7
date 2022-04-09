import { UpdatePostDto } from "../dto/update-post.dto"
import { Post } from "../entities/post.entity"

export interface IPostsRepository {
    getAllPosts()

    savePost(postData: Post)

    getById(postId: string)

    update(postId: string, updatePostDto: UpdatePostDto)

    delete(postId: string)
}