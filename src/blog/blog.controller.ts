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
  UseInterceptors
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

import { AuthGuard } from "@nestjs/passport";
// OPTIONAL (if you have it)
// import { AdminGuard } from "../auth/admin.guard";

import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/createBlog.dto";

@Controller("blogs")
export class BlogController {

  constructor(
    private readonly blogService: BlogService
  ) {}

  // 🔒 CREATE BLOG (ADMIN)
  @UseGuards(AuthGuard("jwt"))
  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const unique =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

          cb(null, unique + extname(file.originalname));
        }
      })
    })
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateBlogDto
  ) {
    return this.blogService.create({
      ...dto,
      image: file?.filename
    });
  }

  // 🌍 PUBLIC: GET ONLY PUBLISHED BLOGS
  @Get("published")
  findPublished() {
    return this.blogService.findPublished();
  }

  // 🌍 PUBLIC: GET ONE PUBLISHED BLOG
  @Get("published/:id")
  findPublishedOne(@Param("id") id: string) {
    return this.blogService.findPublishedOne(+id);
  }

  // 🔐 ADMIN: GET ALL BLOGS (Draft + Published)
  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  // 🔐 ADMIN: GET ONE BLOG (any status)
  @UseGuards(AuthGuard("jwt"))
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.blogService.findOne(+id);
  }

  // 🔒 UPDATE BLOG (ADMIN)
  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const unique =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

          cb(null, unique + extname(file.originalname));
        }
      })
    })
  )
  update(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: any
  ) {
    return this.blogService.update(+id, {
      ...dto,
      ...(file && { image: file.filename })
    });
  }

  // 🔒 DELETE BLOG (ADMIN)
  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.blogService.remove(+id);
  }
}

export default BlogController;