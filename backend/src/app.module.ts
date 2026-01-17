import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SpamRulesController } from './spam.controller';
import { SpamRule } from './spam-rule.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // .env dosyasını okumak için
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Render.com veya diğer sağlayıcılardan gelen URL
      entities: [SpamRule],
      synchronize: true, // DEV ortamında true olabilir, PROD'da dikkatli olunmalı
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    TypeOrmModule.forFeature([SpamRule]),
  ],
  controllers: [SpamRulesController],
  providers: [],
})
export class AppModule {}
