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
import { diskStorage } from 'multer';
import { extname } from 'path';

import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/createInstructor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

const imageStorage = diskStorage({
  destination: './uploads/instructors',

  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, `instructor-${unique}${extname(file.originalname)}`);
  },
});

@Controller('instructors')
export class InstructorController {
  constructor(private readonly service: InstructorService) {}

  // CREATE (protected)
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image', { storage: imageStorage }))
  createInstructor(
    @Body() dto: CreateInstructorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(dto, file?.filename);
  }

  // GET ALL (PUBLIC)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET ONE (PUBLIC)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  // DELETE (ADMIN ONLY)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  // UPDATE (ADMIN ONLY)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image', { storage: imageStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: CreateInstructorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.update(+id, dto, file?.filename);
  }
}