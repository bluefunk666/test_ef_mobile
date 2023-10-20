import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import LogService = require("../logs/logs.service")

@Module({
  providers: [UsersService, ConfigService, AuthService, LogService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
