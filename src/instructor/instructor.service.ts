import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instructor } from './instructor.entity';
import { CreateInstructorDto } from './dto/createInstructor';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private repo: Repository<Instructor>,
  ) {}

  // ✅ CREATE (with image support)
  create(dto: CreateInstructorDto, image?: string) {
    const instructor = this.repo.create({
      ...dto,
      image: image ? image : undefined,
    });

    return this.repo.save(instructor);
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

  // ✅ UPDATE
  async update(id: number, dto: CreateInstructorDto, image?: string) {
    const instructor = await this.repo.findOne({
      where: { id },
    });

    if (!instructor) {
      return {
        message: 'Instructor not found',
      };
    }

    const updatedData: any = {
      ...dto,
    };

    // only update image if new image is provided
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
    const instructor = await this.repo.findOne({
      where: { id },
    });

    if (!instructor) {
      return {
        message: 'Instructor not found',
      };
    }

    await this.repo.delete(id);

    return {
      message: 'Instructor deleted successfully',
    };
  }
}