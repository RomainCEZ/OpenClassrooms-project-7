/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";
import ICommentsRepository from "../interfaces/CommentsRepository";

@Injectable()
export default class CommentsRepository implements ICommentsRepository {
    saveComment(postId: string, comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getCommentsByPostId(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    getCommentById(commentId: string): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    getByAuthorId(userId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    updateCommentById(commentId: string, updateCommentDto: UpdateCommentDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteCommentById(commentId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}