import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';

export class UpdateClassDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
          message: 'class name should only contain letters and numbers, no special characters allowed',
        })
  className: string;
}