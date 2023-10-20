import { createParamDecorator } from '@nestjs/common';
import { User } from '../users/users.model';

export const UserParam = createParamDecorator<User>((data, req) => {
  return req.switchToHttp().getRequest().user;
});
