import { UserDto } from '../../users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty({ type: () => UserDto })
  user: UserDto;

  constructor(user: UserDto) {
    this.user = user;
  }
}

export class AdminRegisterResponse {
  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}
