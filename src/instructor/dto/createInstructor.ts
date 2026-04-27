import {
  IsNotEmpty,
  IsEmail,
  IsOptional
} from "class-validator";

export class CreateInstructorDto {

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: string;

  // ✅ same as blog style (optional image)
  @IsOptional()
  image?: string;
}