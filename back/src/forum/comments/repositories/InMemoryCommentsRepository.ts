import { Injectable, NotFoundException } from "@nestjs/common";
import { commentsData } from "../data/commentsData";
import { Comment } from "../entities/comment.entity";
import ICommentsRepository from "../interfaces/CommentsRepository";
import { UpdateCommentDto } from "../dto/update-comment.dto";

interface PostComments {
    postId: string
    comments: Comment[]
}

@Injectable()
export default class InMemoryCommentsRepository implements ICommentsRepository {
    data: PostComments[];
    constructor() {
        this.data = commentsData
    }
    async getByAuthorId(userId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }

    async getCommentById(commentId: string): Promise<Comment> {
        const post = this.data.find(postComments => postComments.comments.find(comment => comment.id === commentId))
        const comment = post.comments.find(comment => comment.id === commentId)
        return comment
    }
    async updateCommentById(commentId: string, updateCommentDto: UpdateCommentDto) {
        const postComments = this.data.find(postComments => postComments.comments.find(comment => comment.id === commentId))
        const comment = postComments.comments.find(comment => comment.id === commentId)
        const updatedComment = { ...comment, ...updateCommentDto }
        const updatedComments = [...postComments.comments.filter(comment => comment.id !== commentId), updatedComment]
        this.data = [...this.data.filter(commentsData => commentsData.postId !== postComments.postId), { postId: postComments.postId, comments: updatedComments }]
    }
    async deleteCommentById(commentId: string) {
        const postComments = this.data.find(postComments => postComments.comments.find(comment => comment.id === commentId))
        const filteredComments = postComments.comments.filter(comment => comment.id !== commentId)
        this.data = this.data.filter(commentsData => commentsData.postId !== postComments.postId)
        this.data.push({ postId: postComments.postId, comments: filteredComments })
    }
    async saveComment(postId: string, comment: Comment) {
        const comments = await this.getCommentsByPostId(postId)
        this.data = [...this.data, { postId, comments: [...comments, comment] }]
    }
    async getCommentsByPostId(postId: string): Promise<Comment[]> {
        const comments = this.data.find(postComments => postComments.postId === postId).comments
        if (!comments) {
            throw new NotFoundException()
        }
        return comments
    }
    async deleteCommentsByPostId(postId: string) {
        this.getCommentsByPostId(postId)
        this.data.filter(postComments => postComments.postId !== postId)
    }

}