import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';

@Module({
  exports: [TransactionService],
  providers: [TransactionService],
})
export class CommonModule {}
