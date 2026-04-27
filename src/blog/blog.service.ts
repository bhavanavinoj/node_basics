import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/createBlog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,
  ) {}

  create(dto: CreateBlogDto) {
    return this.blogRepo.save(dto);
  }

  findAll() {
    return this.blogRepo.find();
  }

  findOne(id: number) {
    return this.blogRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: any) {
    await this.blogRepo.update(id, dto);

    return this.blogRepo.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    const blog = await this.blogRepo.findOne({
      where: { id },
    });

    if (!blog) {
      return {
        message: 'Blog not found',
      };
    }

    await this.blogRepo.delete(id);

    return {
      message: 'Blog deleted successfully',
    };
  }
}
