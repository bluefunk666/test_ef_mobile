import { ApiProperty } from '@nestjs/swagger';

export enum ResponseStatuses {
  Success = 'success',
  Error = 'error',
}

export default class CustomResponse<T> {
  @ApiProperty({ enum: ResponseStatuses, example: ResponseStatuses.Success })
  status: ResponseStatuses;
  @ApiProperty()
  message?: string;
  data?: T;

  constructor(data?: T, status?: ResponseStatuses, message?: string) {
    this.status = !status ? ResponseStatuses.Success : status;
    this.message = !message ? null : message;
    this.data = data;
  }
}
