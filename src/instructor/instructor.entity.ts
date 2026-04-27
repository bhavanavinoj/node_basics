import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  // ✅ FIXED: make image optional
  @Column({ nullable: true })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;
}
