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
    SequelizeModule.forRoot({ ...sequelizeConfig, models: ([UserModel, PostModel, CommentModel]), sync: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    ForumModule, ImagesModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.CLIENT_SERVE_FOLDER),
      exclude: ['/api*', '/auth*', '/images*'],
    })
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const sequelize = new Sequelize(sequelizeConfig)
    const sequelizeStore = new (SequelizeStore(session.Store))({ db: sequelize })
    consumer
      .apply(
        session({
          store: sequelizeStore,
          saveUninitialized: false,
          secret: process.env.SESSION_SECRET,
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24h
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
    sequelizeStore.sync()
  }
}
