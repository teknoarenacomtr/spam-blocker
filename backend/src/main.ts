import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS Aktif Et
  app.enableCors();

  // Statik Dosyalar (Admin Panel)
  app.use(express.static(join(__dirname, '..', 'client')));

  const config = new DocumentBuilder()
    .setTitle('Spam Blocker API')
    .setDescription('Spam kurallarını yöneten API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger yolunu değiştirdim, çakışmasın

  // Render.com PORT'u otomatik atar, yoksa 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running at port ${port}`);
}
bootstrap();
