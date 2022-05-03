import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import CommentsRepository from './repositories/CommentsRepository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) { }

  async create(createCommentDto: CreateCommentDto) {
    const postId = createCommentDto.postId
    const comment = Comment.create(createCommentDto)
    this.commentsRepository.saveComment(postId, comment)
  }

  async findAll(postId: string): Promise<Comment[]> {
    return this.commentsRepository.getCommentsByPostId(postId)
  }

  async getCommentById(commentId: string): Promise<Comment> {
    return await this.commentsRepository.getCommentById(commentId)
  }

  async getByAuthorId(userId: string) {
    return await this.commentsRepository.getByAuthorId(userId)
  }

  async updateCommentById(commentId: string, updatedContent: UpdateCommentDto) {
    return await this.commentsRepository.updateCommentById(commentId, updatedContent)
  }

  async deleteCommentById(commentId: string) {
    return await this.commentsRepository.deleteCommentById(commentId)
  }

  async like(userId: string, commentId: string) {
    const comment = await this.commentsRepository.getCommentById(commentId)
    const likes = comment.likes.includes(userId) ? comment.likes.filter(id => id !== userId) : [...comment.likes, userId]
    const dislikes = comment.dislikes.includes(userId) ? comment.dislikes.filter(id => id !== userId) : comment.dislikes
    await this.commentsRepository.updateCommentById(commentId, { likes, dislikes })
  }
  async dislike(userId: string, commentId: string) {
    const comment = await this.commentsRepository.getCommentById(commentId)
    const dislikes = comment.dislikes.includes(userId) ? comment.dislikes.filter(id => id !== userId) : [...comment.dislikes, userId]
    const likes = comment.likes.includes(userId) ? comment.likes.filter(id => id !== userId) : comment.likes
    await this.commentsRepository.updateCommentById(commentId, { likes, dislikes })
  }
}
