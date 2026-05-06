import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum CourseType {
  FREE = 'free',
  PAID = 'paid',
}

export enum CourseLevel {
  BEGINNER = 'beginner',
  MODERATE = 'moderate',
  ADVANCED = 'advanced',
}

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  author: string; // ✅ NEW

  @Column('decimal', { nullable: true })
  price: number;

  @Column()
  duration: string;

  // ❌ REMOVE THIS
  // @Column({ default: true })
  // isPublished: boolean;

  // ✅ ADD THIS
  @Column({
    default: 'published',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: CourseType,
    default: CourseType.FREE,
  })
  type: CourseType;

  @Column({
    type: 'enum',
    enum: CourseLevel,
    default: CourseLevel.BEGINNER,
  })
  level: CourseLevel;

  // optional fields
  @Column({ default: 0 })
  students: number;

  @Column({ default: 0 })
  rating: number;
}