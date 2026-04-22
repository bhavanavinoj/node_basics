import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // VALIDATION PIPE 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // removes extra fields
      forbidNonWhitelisted: true,   // throws error if extra fields sent
      transform: true,              // auto-transform DTOs
    }),
  );

  await app.listen(3000);

  console.log('🚀 Server running on http://localhost:3000');
}

bootstrap();