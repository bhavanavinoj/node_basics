import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { BlogModule } from './blog/blog.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { InstructorModule } from './instructor/instructor.module'; // ✅ ONLY THIS

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'lms_demo',
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    MailModule,
    AdminModule,
    BlogModule,
    ChangePasswordModule,
    InstructorModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}