import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";

export default interface ICommentsRepository {

    saveComment(postId: string, comment: Comment)
    getCommentsByPostId(postId: string): Promise<Comment[]>
    getCommentById(commentId: string): Promise<Comment>
    updateCommentById(commentId: string, updateCommentDto: UpdateCommentDto)
    deleteCommentById(commentId: string)

}