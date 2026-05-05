import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/createCourse.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private repo: Repository<Course>,
  ) {}

  // ✅ CREATE (with image + free/paid logic)
  create(dto: CreateCourseDto, image?: string) {
    const data: any = {
      ...dto,
      image: image ? image : undefined,
    };

    // ✅ enforce FREE course logic
    if (dto.type === 'free') {
      data.price = 0;
    }

    const course = this.repo.create(data);
    return this.repo.save(course);
  }

  // ✅ GET ALL
  findAll() {
    return this.repo.find({
      order: { id: 'DESC' },
    });
  }

  // ✅ GET ONE
  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }

  // ✅ UPDATE (with free/paid + image handling)
  async update(id: number, dto: CreateCourseDto, image?: string) {
    const course = await this.repo.findOne({
      where: { id },
    });

    if (!course) {
      return {
        message: 'Course not found',
      };
    }

    const updatedData: any = {
      ...dto,
    };

    // ✅ enforce FREE logic again
    if (dto.type === 'free') {
      updatedData.price = 0;
    }

    // ✅ update image only if provided
    if (image) {
      updatedData.image = image;
    }

    await this.repo.update(id, updatedData);

    return this.repo.findOne({
      where: { id },
    });
  }

  // ✅ DELETE
  async remove(id: number) {
    const course = await this.repo.findOne({
      where: { id },
    });

    if (!course) {
      return {
        message: 'Course not found',
      };
    }

    await this.repo.delete(id);

    return {
      message: 'Course deleted successfully',
    };
  }
}