import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UsersService } from 'src/users/users.service';
import { TransactionService } from 'src/common/services/transaction.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly usersService: UsersService,
    private readonly transactionService: TransactionService,
  ) {}

  // Methods for endpoints
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.transactionService.runInTransaction(
      async (queryRunner: QueryRunner) => {
        const employee = await this.createEmployee(
          createEmployeeDto,
          queryRunner,
        );
        await this.usersService.create(
          {
            username: createEmployeeDto.identityNumberDocument,
            employee,
          },
          queryRunner,
        );
        return employee;
      },
    );
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  // Internal helpers methods
  private async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
    queryRunner?: QueryRunner,
  ) {
    const repository = queryRunner
      ? queryRunner.manager.getRepository(Employee)
      : this.employeeRepository;
    const employee = repository.create(createEmployeeDto);
    return await repository.save(employee);
  }
}
