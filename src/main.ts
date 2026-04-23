import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  console.log('MAIN.TS LOADED');
  const app = await NestFactory.create(AppModule);

    console.log('VALIDATION PIPE ACTIVE');


  // CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // VALIDATION PIPE (FIXED)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      

      // 👇 ONLY FIRST ERROR
      exceptionFactory: (errors) => {
        const firstError = errors[0];

        // get first validation message
        const message = firstError?.constraints
          ? Object.values(firstError.constraints)[0]
          : 'Validation error';

        return new BadRequestException(message);
      },
    }),
  );

  await app.listen(process.env.PORT || 3000);

  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();