import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetUsersQueryDto {
  @IsNumberString()
  @IsOptional()
  readonly id?: number;

  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly login: string;

  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  limit?: string;
}
