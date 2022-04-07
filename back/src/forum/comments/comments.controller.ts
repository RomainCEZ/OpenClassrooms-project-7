import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthenticationGuard } from '../../auth/guard/authentication.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
