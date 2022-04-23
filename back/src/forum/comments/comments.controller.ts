import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AuthenticationGuard } from '../../auth/guard/authentication.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(AuthenticationGuard)
  @Post(":postId")
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req, @Param("postId") postId: string) {
    createCommentDto.content = req.body.content
    createCommentDto.postId = postId
    createCommentDto.author = req.user.username
    createCommentDto.authorId = req.user.id
    await this.commentsService.create(createCommentDto);
  }

  @Get(":postId")
  async findAll(@Param("postId") postId: string) {
    const postComments = await this.commentsService.findAll(postId);
    return postComments
  }

  @Get(':commentId')
  async findOne(@Param('commentId') commentId: string) {
    return await this.commentsService.getCommentById(commentId);
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':commentId')
  async update(@Param('commentId') commentId: string, @Req() req) {
    const comment = await this.commentsService.getCommentById(commentId)
    if (req.user.id === comment.authorId || req.user.role === 'admin') {
      return await this.commentsService.updateCommentById(commentId, { ...req.body });
    }
    throw new ForbiddenException("Requête non autorisée !")
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':commentId')
  async remove(@Param('commentId') commentId: string, @Req() req) {
    const comment = await this.commentsService.getCommentById(commentId)
    if (req.user.id === comment.authorId || req.user.role === 'admin') {
      return await this.commentsService.deleteCommentById(commentId);
    }
    throw new ForbiddenException("Requête non autorisée !")
  }
}