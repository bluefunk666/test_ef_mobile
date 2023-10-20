import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'example@mail.com', description: 'Unique email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

  @ApiProperty({ example: 'Valera2007', description: 'Unique login' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 16, {
    message: 'The length must be at least 3 characters and not more than 16',
  })
  readonly login: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString({ message: 'Must be a string' })
  @Length(8, 32, {
    message: 'The length must be at least 8 characters and not more than 32',
  })
  readonly password: string;
}
