import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 25,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 25,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 8,
  })
  identityNumberDocument: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToOne(() => User, (user) => user.employee, { eager: true })
  user: User;
}
