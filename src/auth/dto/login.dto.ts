import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'username', description: 'login' })
  @IsString({ message: 'Must be a string' })
  readonly login: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString({ message: 'Must be a string' })
  @Length(8, 32, {
    message: 'The length must be at least 8 characters and not more than 32',
  })
  readonly password: string;
}
