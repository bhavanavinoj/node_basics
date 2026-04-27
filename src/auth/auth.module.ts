import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { Admin } from '../admin/admin.entity';
import { User } from '../users/user.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretkey', 
      signOptions: { expiresIn: '1d' },
    }),

    MailModule,
  ],

  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],

  exports: [JwtModule], 
})
export class AuthModule {}