import { Comment } from "../entities/comment.entity";
import PostComments from "./PostComments";

export default interface ICommentsRepository {

    saveComment(postId: string, comment: Comment)
    getPostCommentsByPostId(postId: string)
    deletePostCommentsByPostId(postId: string)

}