import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  identityNumberDocument: string;
}
