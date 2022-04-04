import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import InMemoryCommentsRepository from './repositories/InMemoryCommentsRepository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, InMemoryCommentsRepository]
})
export class CommentsModule { }
