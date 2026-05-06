import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  duration: string;

  @IsEnum(['free', 'paid'])
  type: 'free' | 'paid';

  @IsEnum(['beginner', 'moderate', 'advanced'])
  level: 'beginner' | 'moderate' | 'advanced';

  // ✅ NEW STATUS FIELD
  @IsString()
  status: 'published' | 'draft';
}