import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/createInstructor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('instructors')
export class InstructorController {
  constructor(private readonly service: InstructorService) {}

  // 🔥 CREATE (ADMIN ONLY + IMAGE UPLOAD)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createInstructor(
    @Body() dto: CreateInstructorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(dto, file?.filename);
  }

  // 🔥 GET ALL
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  // 🔥 DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }

  // 🔥 UPDATE (WITH OPTIONAL IMAGE)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image')) // ✅ IMPORTANT FIX
  update(
    @Param('id') id: number,
    @Body() dto: CreateInstructorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.update(id, dto, file?.filename);
  }
}
