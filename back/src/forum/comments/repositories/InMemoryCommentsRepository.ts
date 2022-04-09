import { Injectable, NotFoundException } from "@nestjs/common";
import { commentsData } from "../data/commentsData";
import { Comment } from "../entities/comment.entity";
import PostComments from "../interfaces/PostComments";
import ICommentsRepository from "../interfaces/CommentsRepository";
import { UpdateCommentDto } from "../dto/update-comment.dto";

@Injectable()
export default class InMemoryCommentsRepository implements ICommentsRepository {
    data: PostComments[];
    constructor() {
        this.data = commentsData
    }
    getCommentById(commentId: string) {
        const post = this.data.find(postComments => postComments.comments.find(comment => comment.id === commentId))
        const comment = post.comments.find(comment => comment.id === commentId)
        return comment
    }
    updateCommentById(commentId: string, updateCommentDto: UpdateCommentDto) {
        const postComments = this.data.find(postComments => postComments.comments.find(comment => comment.id === commentId))
        const comment = postComments.comments.find(comment => comment.id === commentId)
        const updatedComment = { ...comment, ...updateCommentDto }
        const updatedComments = postComments.comments.filter(comment => comment.id !== commentId)
        updatedComments.push(updatedComment)
        this.data = this.data.filter(commentsData => commentsData.postId !== postComments.postId)
        this.data.push({ postId: postComments.postId, comments: updatedComments })
    }
    deleteCommentById(commentId: string) {
        const postComments = this.data.find(postComments => postComments.comments.find(comment => comment.id === commentId))
        const filteredComments = postComments.comments.filter(comment => comment.id !== commentId)
        this.data = this.data.filter(commentsData => commentsData.postId !== postComments.postId)
        this.data.push({ postId: postComments.postId, comments: filteredComments })
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