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

  @Column('decimal', { nullable: true }) // ✅ allow null for free
  price: number;

  @Column()
  duration: string;

  @Column({ default: true })
  isPublished: boolean;

  // ✅ ADD THIS
  @Column({
    type: 'enum',
    enum: CourseType,
    default: CourseType.FREE,
  })
  type: CourseType;

  // ✅ ADD THIS
  @Column({
    type: 'enum',
    enum: CourseLevel,
    default: CourseLevel.BEGINNER,
  })
  level: CourseLevel;
}