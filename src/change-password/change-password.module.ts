import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChangePasswordController } from './change-password.controller';
import { ChangePasswordService } from './change-password.service';

import { Admin } from '../admin/admin.entity';

@Module({
 imports: [
   TypeOrmModule.forFeature([Admin])
 ],
 controllers: [
   ChangePasswordController
 ],
 providers: [
   ChangePasswordService
 ]
})
export class ChangePasswordModule {}