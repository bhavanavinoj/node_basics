import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course, CourseType } from './course.entity';
import { CreateCourseDto } from './dto/createCourse.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private repo: Repository<Course>,
  ) {}

  // ✅ CREATE
  create(dto: CreateCourseDto, image?: string) {
    const data: any = {
      ...dto,
      image: image || null,

      // ✅ defaults
      students: 0,
      rating: 0,
      status: dto.status || 'draft', // ✅ NEW
    };

    // ✅ FREE course logic
    if (dto.type === CourseType.FREE) {
      data.price = 0;
    }

    const course = this.repo.create(data);
    return this.repo.save(course);
  }

  // ✅ PUBLIC (only published courses)
  findAll() {
    return this.repo.find({
      where: { status: 'published' } as any, // ✅ UPDATED (cast to any to satisfy typings)
      order: { id: 'DESC' },
    });
  }

  // ✅ ADMIN (all courses)
  findAllAdmin() {
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

  // ✅ UPDATE
  async update(id: number, dto: CreateCourseDto, image?: string) {
    const course = await this.repo.findOne({ where: { id } });

    if (!course) {
      return { message: 'Course not found' };
    }

    const updatedData: any = {
      ...dto,
    };

    // ✅ FREE logic
    if (dto.type === CourseType.FREE) {
      updatedData.price = 0;
    }

    // ✅ update image only if provided
    if (image) {
      updatedData.image = image;
    }

    // ❗ don't overwrite calculated fields
    delete updatedData.students;
    delete updatedData.rating;

    await this.repo.update(id, updatedData);

    return this.repo.findOne({ where: { id } });
  }

  // ✅ DELETE
  async remove(id: number) {
    const course = await this.repo.findOne({ where: { id } });

    if (!course) {
      return { message: 'Course not found' };
    }

    await this.repo.delete(id);

    return {
      message: 'Course deleted successfully',
    };
  }

  // ✅ 🔥 TOGGLE STATUS (replacement for isPublished)
  async toggleStatus(id: number) {
    const course = await this.repo.findOne({ where: { id } });

    if (!course) {
      return { message: 'Course not found' };
    }

    // cast to any to access optional or unmapped 'status' property safely
    (course as any).status =
      (course as any).status === 'published' ? 'draft' : 'published';

    return this.repo.save(course);
  }
}