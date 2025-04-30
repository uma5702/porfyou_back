
import * as dotenv from 'dotenv';
dotenv.config();  // 추가 !!

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  

  const app = await NestFactory.create(AppModule,{ logger: ['error', 'warn', 'log', 'debug', 'verbose'] });
  app.enableCors({
    origin: ['http://localhost:5173', 'http://13.54.117.136'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Porfyou API')
    .setDescription('포트폴리오 관리 API 명세서')
    .setVersion('1.0')
    .addBearerAuth() // Authorization 헤더 지원
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(3000);
}
bootstrap();
