import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import LogService = require('./logs/logs.service');
import { Log } from './logs/logs.model';
import * as dotenv from 'dotenv';


dotenv.config();

@Module({
  controllers: [],
  providers: [LogService, AuthService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Log],
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true,
      },
    }),
    UsersModule,
  ],
})
export class AppModule {
  constructor(private readonly logsService: LogService,
              private readonly authService: AuthService) {}

  test() {}
}
