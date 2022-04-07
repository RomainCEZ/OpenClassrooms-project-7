import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from "@nestjs/sequelize"
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import { Sequelize } from 'sequelize-typescript';
import * as SequelizeStore from 'connect-session-sequelize'
import { ForumModule } from './forum/forum.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { UserModel } from './Database/sequelizeModels/User.model';
import { PostModel } from './Database/sequelizeModels/Post.model';
import { CommentModel } from './Database/sequelizeModels/Comment.model'
import sequelizeConfig from './Database/sequelize.config';


@Module({
  imports: [
    SequelizeModule.forRoot({ ...sequelizeConfig, models: ([UserModel, PostModel, CommentModel]), synchronize: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    ForumModule, ImagesModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
      exclude: ['/api*', '/auth*', '/images*'],
    })
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const sequelizeStore = new (SequelizeStore(session.Store))({ db: new Sequelize(sequelizeConfig) })
    consumer
      .apply(
        session({
          store: sequelizeStore,
          saveUninitialized: false,
          secret: process.env.SESSION_SECRET,
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
    sequelizeStore.sync()
  }
}
