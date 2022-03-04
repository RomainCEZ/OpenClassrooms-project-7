import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { InMemoryPostsRepository } from './mock/InMemoryPostsRepository';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../common/MulterConfig';

@Module({
  imports: [MulterModule.register(multerConfig)],
  controllers: [PostsController],
  providers: [PostsService, InMemoryPostsRepository]
})
export class PostsModule {}
