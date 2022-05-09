import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentModel } from '../../Database/sequelizeModels/Comment.model';
import CommentsRepository from './repositories/CommentsRepository';
import CommentsDBAdapter from './repositories/CommentsDB.adapter';
import { PostModel } from '../../Database/sequelizeModels/Post.model';

@Module({
  imports: [SequelizeModule.forFeature([CommentModel, PostModel])],
  controllers: [CommentsController],
  providers: [CommentsService,
    { provide: CommentsRepository, useClass: CommentsDBAdapter }
  ],
})
export class CommentsModule { }
