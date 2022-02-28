import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { InMemoryPostsRepository } from './mock/InMemoryPostsRepository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, InMemoryPostsRepository]
})
export class PostsModule {}
