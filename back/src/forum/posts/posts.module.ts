import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../../common/MulterConfig';
import { PostsRepository } from './repositories/PostsRepository';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostModel } from '../../Database/sequelizeModels/Post.model';
import { PostsDBAdapter } from './repositories/PostsDB.adapter';

@Module({
  imports: [
    MulterModule.register(multerConfig),
    SequelizeModule.forFeature([PostModel])
  ],
  controllers: [PostsController],
  providers: [PostsService,
    { provide: PostsRepository, useClass: PostsDBAdapter }
  ]
})
export class PostsModule { }
