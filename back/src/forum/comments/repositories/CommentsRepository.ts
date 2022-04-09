import { Injectable } from "@nestjs/common";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";
import ICommentsRepository from "../interfaces/CommentsRepository";
import CommentData from "../interfaces/PostComments";

@Injectable()
export default class CommentsRepository implements ICommentsRepository {

    saveComment(postId: string, comment: Comment) {
        throw new Error("Method not implemented.");
    }
    getPostCommentsByPostId(postId: string): CommentData {
        throw new Error("Method not implemented.");
    }
    getCommentById(commentId: string): Comment | Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    updateCommentById(commentId: string, updateCommentDto: UpdateCommentDto) {
        throw new Error("Method not implemented.");
    }
    deleteCommentById(commentId: string) {
        throw new Error("Method not implemented.");
    }
}