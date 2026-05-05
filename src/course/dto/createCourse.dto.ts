import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  duration: string;

  // ✅ ADD
  @IsEnum(['free', 'paid'])
  type: 'free' | 'paid';

  // ✅ ADD
  @IsEnum(['beginner', 'moderate', 'advanced'])
  level: 'beginner' | 'moderate' | 'advanced';
}