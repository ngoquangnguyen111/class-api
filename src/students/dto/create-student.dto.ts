import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    @Matches(/^[a-zA-Z ]*$/, {
            message: 'student name should only contain letters, no numbers or special characters allowed',
          })
    public name: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    @Matches(/^[a-zA-Z0-9 ]*$/, {
        message: 'class name should only contain letters and numbers, no special characters allowed',
      })
    public className: string;
}

