import { Module } from '@nestjs/common';
import { ForumModule } from './forum/forum.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ForumModule, ImagesModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
      exclude: ['/api*', '/auth*', '/images*'],
    })]
})
export class AppModule {}
