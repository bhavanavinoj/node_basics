import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: '' })
  tags: string;

  @Column()
  author: string;

  @Column({ name: 'publish_date' })
  publishDate: string;

  @Column({ default: 'Select' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
