import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";

export default interface ICommentsRepository {

    saveComment(postId: string, comment: Comment): Promise<void>
    getCommentsByPostId(postId: string): Promise<Comment[]>
    getCommentById(commentId: string): Promise<Comment>
    getByAuthorId(userId: string): Promise<Comment[]>
    updateCommentById(commentId: string, updateCommentDto: UpdateCommentDto): Promise<void>
    deleteCommentById(commentId: string): Promise<void>

}