import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString
} from "class-validator";

export class CreateInstructorDto {

  @IsNotEmpty({
    message: "Instructor name is required"
  })
  @IsString({
    message: "Name must be text"
  })
  name: string;


  @IsNotEmpty({
    message: "Email is required"
  })
  @IsEmail(
    {},
    {
      message: "Enter a valid email address"
    }
  )
  email: string;


  @IsNotEmpty({
    message: "Role is required"
  })
  @IsString({
    message: "Role must be text"
  })
  role: string;


  // optional on edit, validate file separately in controller for create
  @IsOptional()
  image?: string;
}