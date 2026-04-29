import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsDateString,
} from "class-validator";

export class CreateBlogDto {
    @IsNotEmpty({ message: "Blog title is required" })
    @IsString({ message: "Title must be text" })
    title: string;

    @IsNotEmpty({ message: "Blog content is required" })
    @IsString({ message: "Content must be text" })
    content: string;

    @IsNotEmpty({ message: "Tags are required" })
    @IsString({ message: "Tags must be text" })
    tags: string;

    @IsNotEmpty({ message: "Author is required" })
    @IsString({ message: "Author must be text" })
    author: string;

    // ✅ FIXED: Use ValidationOptions or separate message
    @IsNotEmpty({ message: "Publish date is required" })
    @IsDateString({}, { message: "Publish date must be valid date (DD-MM-YYYY)" })
    publishDate: string;

    @IsNotEmpty({ message: "Status is required" })
    @IsString({ message: "Status must be text" })
    status: string;

    @IsOptional()
    image?: any; // File object for multer
}