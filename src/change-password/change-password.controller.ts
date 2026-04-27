import { Controller, Patch, Body, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Controller('auth')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('admin/change-password')
  changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    return this.changePasswordService.changePassword(req.user.id, dto);
  }
}
