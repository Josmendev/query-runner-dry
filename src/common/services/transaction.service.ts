import { InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';

export class TransactionService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async runInTransaction<T>(
    transactionCallback: (qr: QueryRunner) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await transactionCallback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const errorMessage =
        error instanceof Error ? error.message : 'Error al crear el empleado';
      throw new InternalServerErrorException(errorMessage);
    } finally {
      await queryRunner.release();
    }
  }
}
