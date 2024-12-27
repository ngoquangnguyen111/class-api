import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SearchStudentDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @Matches(/^[a-zA-Z ]*$/, {
          message: 'class name should only contain letters, no numbers or special characters allowed',
        })
  name: string;
}