import { Injectable } from "@nestjs/common";
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
    deletePostCommentsByPostId(postId: string) {
        throw new Error("Method not implemented.");
    }
}