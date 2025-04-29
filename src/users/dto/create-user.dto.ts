import { IsNotEmpty, IsNumberString, Length } from 'class-validator';
import { Employee } from 'src/employees/entities/employee.entity';

export class CreateUserDto {
  @IsNumberString()
  @Length(8, 8)
  @IsNotEmpty()
  username: string;

  employee: Employee;
}
