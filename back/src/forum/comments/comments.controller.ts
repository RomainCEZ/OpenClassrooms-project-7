import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException, Request } from '@nestjs/common';
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

  @UseGuards(AuthenticationGuard)
  @Get("mycomments")
  async getMyComments(@Request() req) {
    console.log(req.user.id)
    const posts = await this.commentsService.getByAuthorId(req.user.id);
    return posts
  }

  @Get(":postId")
  async findAll(@Param("postId") postId: string) {
    const postComments = await this.commentsService.findAll(postId);
    return postComments
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

  @UseGuards(AuthenticationGuard)
  @Post(':commentId/like')
  async like(@Request() req, @Param('commentId') commentId: string) {
    if (req.body.like === 1) {
      await this.commentsService.like(req.user.id, commentId)
    }
    if (req.body.like === -1) {
      await this.commentsService.dislike(req.user.id, commentId)
    }
  }
}