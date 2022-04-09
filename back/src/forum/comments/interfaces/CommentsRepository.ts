import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";

export default interface ICommentsRepository {

    saveComment(postId: string, comment: Comment)
    getPostCommentsByPostId(postId: string)
    getCommentById(commentId: string)
    updateCommentById(commentId: string, updateCommentDto: UpdateCommentDto)
    deleteCommentById(commentId: string)

}