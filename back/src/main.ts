import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import * as session from 'express-session'
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config()
  app.enableCors({
    origin: `${process.env.CLIENT_ADDRESS}`,
    credentials: true
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.use(
    session({
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24h
    }),
  );
  app.use(passport.initialize())
  app.use(passport.session())
  
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
