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
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/createCourse.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

// 📁 Storage config
const imageStorage = diskStorage({
  destination: './uploads/courses',
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `course-${unique}${extname(file.originalname)}`);
  },
});

@Controller('courses')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  // ✅ CREATE (ADMIN ONLY)
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image', { storage: imageStorage }))
  createCourse(
    @Body() dto: CreateCourseDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.create(dto, file?.filename);
  }

  // ✅ GET ALL
  // 🔥 PUBLIC → only published
  // 🔥 ADMIN → all courses
  @Get()
  findAll(@Query('admin') admin?: string) {
    if (admin === 'true') {
      return this.service.findAllAdmin(); // all courses
    }
    return this.service.findAll(); // only published
  }

  // ✅ GET ONE
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // ✅ DELETE (ADMIN ONLY)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  // ✅ UPDATE (ADMIN ONLY)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image', { storage: imageStorage }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCourseDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.update(id, dto, file?.filename);
  }

  // ✅ 🔥 NEW: Toggle status (published ↔ draft)
  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  toggleStatus(@Param('id', ParseIntPipe) id: number) {
    return this.service.toggleStatus(id);
  }
}