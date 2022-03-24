import { Module } from '@nestjs/common';
import { ForumModule } from './forum/forum.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ForumModule, ImagesModule, AuthModule]
})
export class AppModule {}
