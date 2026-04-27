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

import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/createBlog.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("blogs")
export class BlogController {

  constructor(
    private readonly blogService: BlogService
  ) {}

  // CREATE BLOG WITH IMAGE
  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const unique =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

          cb(
            null,
            unique + extname(file.originalname)
          );
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

  // GET ALL
  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  // GET ONE
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.blogService.findOne(+id);
  }

  // UPDATE BLOG WITH OPTIONAL IMAGE
  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const unique =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

          cb(
            null,
            unique + extname(file.originalname)
          );
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

  // DELETE
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.blogService.remove(+id);
  }
}

export default BlogController;