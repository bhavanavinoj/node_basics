import {
 IsNotEmpty,
 IsOptional,
 IsString
} from "class-validator";

export class CreateBlogDto {

 @IsNotEmpty({
   message:"Blog title is required"
 })
 @IsString({
   message:"Title must be text"
 })
 title: string;


 @IsNotEmpty({
   message:"Blog content is required"
 })
 @IsString({
   message:"Content is required"
 })
 content: string;


 // keep optional for edit
 @IsOptional()
 image?: string;


 @IsNotEmpty({
   message:"Status is required"
 })
 status: string;

}