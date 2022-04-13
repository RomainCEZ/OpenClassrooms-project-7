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

  async updateCommentById(commentId: string, updatedContent: UpdateCommentDto) {
    return await this.commentsRepository.updateCommentById(commentId, updatedContent)
  }

  async deleteCommentById(commentId: string) {
    return await this.commentsRepository.deleteCommentById(commentId)
  }
}
