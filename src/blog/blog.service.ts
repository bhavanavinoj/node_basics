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

  // 🔒 CREATE (Admin)
  create(dto: CreateBlogDto) {
    return this.blogRepo.save(dto);
  }

  // 🔐 ADMIN: get ALL blogs (Published + Draft)
  findAll() {
    return this.blogRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  // 🌍 PUBLIC: only Published blogs
  findPublished() {
    return this.blogRepo.find({
      where: { status: 'Published' },
      order: { createdAt: 'DESC' },
      take: 3,
    });
  }

  // 🌍 PUBLIC: get single blog (only if published)
  findPublishedOne(id: number) {
    return this.blogRepo.findOne({
      where: { id, status: 'Published' },
    });
  }

  // 🔐 ADMIN: get single blog (any status)
  findOne(id: number) {
    return this.blogRepo.findOne({
      where: { id },
    });
  }

  // 🔒 UPDATE (Admin)
  async update(id: number, dto: any) {
    await this.blogRepo.update(id, dto);

    return this.blogRepo.findOne({
      where: { id },
    });
  }

  // 🔒 DELETE (Admin)
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