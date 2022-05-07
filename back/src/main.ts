import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { json } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.enableCors({
    origin: `${process.env.CLIENT_ADDRESS}`,
    credentials: true
  });
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));
  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
  })
  app.use(limiter)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
