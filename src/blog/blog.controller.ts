import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe, // ✅ added
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { AuthGuard } from '@nestjs/passport';

import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/createBlog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // 🔒 CREATE BLOG (ADMIN)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateBlogDto,
  ) {
    return this.blogService.create({
      ...dto,
      image: file?.filename,
    });
  }

  // 🌍 PUBLIC: GET ALL PUBLISHED BLOGS
  @Get('published')
  findPublished() {
    return this.blogService.findPublished();
  }

  // 🔐 ADMIN: GET ALL BLOGS
  @UseGuards(AuthGuard('jwt'))
  @Get('admin/all')
  findAll() {
    return this.blogService.findAll();
  }

  // 🌍 PUBLIC: GET ONE BLOG
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { // ✅ FIXED
    return this.blogService.findOne(id);
  }

  // 🔒 UPDATE BLOG (ADMIN)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number, // ✅ FIXED
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: any,
  ) {
    return this.blogService.update(id, {
      ...dto,
      ...(file && { image: file.filename }),
    });
  }

  // 🔒 DELETE BLOG (ADMIN)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { // ✅ FIXED
    return this.blogService.remove(id);
  }
}

export default BlogController;