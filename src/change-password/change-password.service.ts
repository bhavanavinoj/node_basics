import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Admin } from '../admin/admin.entity'; 
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class ChangePasswordService {

 constructor(
   @InjectRepository(Admin)
   private adminRepo: Repository<Admin>,
 ) {}

 async changePassword(
   adminId: number,
   dto: ChangePasswordDto
 ) {

   const admin = await this.adminRepo.findOne({
     where: {
       id: adminId,
     },
   });

   if (!admin) {
     throw new UnauthorizedException(
       'Admin not found'
     );
   }

   const match = await bcrypt.compare(
     dto.currentPassword,
     admin.password
   );

   if (!match) {
     throw new UnauthorizedException(
       'Current password incorrect'
     );
   }

   const hashedPassword = await bcrypt.hash(
     dto.newPassword,
     10
   );

   admin.password = hashedPassword;

   await this.adminRepo.save(admin);

   return {
     message: 'Password changed successfully',
   };
 }

}