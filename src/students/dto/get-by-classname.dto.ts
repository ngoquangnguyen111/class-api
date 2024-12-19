import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class GetByClassNameDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]*$/, {
          message: 'class name should only contain letters and numbers, no special characters allowed',
        })
  className: string;  
}