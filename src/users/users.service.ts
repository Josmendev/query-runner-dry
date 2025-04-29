import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    queryRunner?: QueryRunner,
  ): Promise<User> {
    const repository = queryRunner
      ? queryRunner.manager.getRepository(User)
      : this.userRepository;
    const user = repository.create(createUserDto);
    return await repository.save(user);
  }
}
