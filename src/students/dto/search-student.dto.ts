import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SearchStudentDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z ]*$/, {
          message: 'class name should only contain letters, no numbers or special characters allowed',
        })
  name: string;
}