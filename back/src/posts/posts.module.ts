import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController, ImagesController } from './posts.controller';
import { InMemoryPostsRepository } from './mock/InMemoryPostsRepository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};
@Module({
  imports: [
    MulterModule.register({
      dest: 'images',
      storage: diskStorage({
        destination: "./images",
        filename: (req, file, callback) => {
            const name = file.originalname.split('.')[0].split(' ').join('_');
            const extension = MIME_TYPES[file.mimetype];
            callback(null, `${name}${Date.now()}.${extension}`);
        }
      })
    })
  ],
  controllers: [PostsController, ImagesController],
  providers: [PostsService, InMemoryPostsRepository]
})
export class PostsModule {}
