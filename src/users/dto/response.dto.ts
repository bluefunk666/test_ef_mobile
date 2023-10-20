import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}
