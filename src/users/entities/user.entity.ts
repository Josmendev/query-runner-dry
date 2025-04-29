import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 8,
  })
  username: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToOne(() => Employee, (employee) => employee.user)
  @JoinColumn()
  employee: Employee;
}
