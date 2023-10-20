import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserDto {
  constructor(model?: any) {
    if (model) {
      this.id = model.id ? model.id : null;
      this.email = model.email;
      this.login = model.login;
    }
  }

  @ApiProperty({ example: '1', description: 'User id' })
  readonly id?: number;

  @ApiProperty({ example: 'example@mail.com', description: 'Unique email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

  @ApiProperty({ example: 'Vitya20028', description: 'Unique login' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 16, {
    message: 'The length must be at least 3 characters and not more than 16',
  })
  readonly login: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'example@mail.com', description: 'Unique email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

  @ApiProperty({ example: 'vitya20123', description: 'Unique login' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 16, {
    message: 'The length must be at least 3 characters and not more than 16',
  })
  readonly login: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  password: string;
}

export class UpdateUserPasswordDto {
  @ApiProperty({ example: '12345678', description: 'Old user password' })
  @IsString({ message: 'Must be a string' })
  @Length(8, 32, {
    message: 'The length must be at least 8 characters and not more than 32',
  })
  readonly oldPassword: string;

  @ApiProperty({
    example: '12345678',
    description: 'Desired new user password',
  })
  @IsString({ message: 'Must be a string' })
  @Length(8, 32, {
    message: 'The length must be at least 8 characters and not more than 32',
  })
  readonly newPassword: string;
}
