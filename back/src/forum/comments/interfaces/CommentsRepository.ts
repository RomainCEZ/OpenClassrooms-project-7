import { Comment } from "../entities/comment.entity";
import PostComments from "./PostComments";

export default interface CommentsRepository {
    data: PostComments[]

    saveComment(postId: string, comment: Comment): void
    getPostCommentsByPostId(postId: string): PostComments
    deletePostCommentsByPostId(postId: string): void

}