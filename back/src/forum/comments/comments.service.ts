import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import PostComments from './interfaces/PostComments';
import CommentsRepository from './repositories/CommentsRepository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) { }

  async create(createCommentDto: CreateCommentDto) {
    const postId = createCommentDto.postId
    const comment = Comment.create(createCommentDto)
    this.commentsRepository.saveComment(postId, comment)
  }

  async findAll(postId: string): Promise<PostComments> {
    return this.commentsRepository.getPostCommentsByPostId(postId)
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
