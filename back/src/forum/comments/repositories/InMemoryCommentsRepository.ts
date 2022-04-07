import { Injectable, NotFoundException } from "@nestjs/common";
import { commentsData } from "../data/commentsData";
import { Comment } from "../entities/comment.entity";
import PostComments from "../interfaces/PostComments";
import ICommentsRepository from "../interfaces/CommentsRepository";

@Injectable()
export default class InMemoryCommentsRepository implements ICommentsRepository {
    data: PostComments[];
    constructor() {
        this.data = commentsData
    }
    saveComment(postId: string, comment: Comment) {
        const postComments = this.getPostCommentsByPostId(postId)
        postComments.comments.unshift(comment)
    }
    getPostCommentsByPostId(postId: string): PostComments {
        const postComments = this.data.find(postComments => postComments.postId === postId)
        if (!postComments) {
            throw new NotFoundException()
        }
        return postComments
    }
    deletePostCommentsByPostId(postId: string) {
        this.getPostCommentsByPostId(postId)
        this.data.filter(postComments => postComments.postId !== postId)
    }

}