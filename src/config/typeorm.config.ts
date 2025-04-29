import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('db.host'),
  port: configService.get<number>('db.port'),
  username: configService.get<string>('db.username'),
  password: configService.get<string>('db.password'),
  database: configService.get<string>('db.database'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get<boolean>('db.synchronize'),
});
