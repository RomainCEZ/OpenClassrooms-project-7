import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, CommentsModule, PostsModule]
})
export class AppModule {}
