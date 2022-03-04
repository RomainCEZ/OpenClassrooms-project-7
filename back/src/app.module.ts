import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ForumModule } from './forum/forum.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [UsersModule, ForumModule, ImagesModule]
})
export class AppModule {}
