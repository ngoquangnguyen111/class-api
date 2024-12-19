import { IsString, IsNotEmpty, Length, IsOptional, Matches } from 'class-validator';

export class UpdateStudentDto {
    @IsOptional()
    @IsString()
    @Length(1, 50)
    @Matches(/^[a-zA-Z ]*$/, {
        message: 'student name should only contain letters and numbers, no numbers or special characters allowed',
    })
    name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    @Matches(/^[a-zA-Z0-9 ]*$/, {
        message: 'class name should only contain letters and numbers, no special characters allowed',
    })
    className?: string;
}

