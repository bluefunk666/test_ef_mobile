import {
  Body,
  Post,
  Controller,
  Get,
  Res,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateUserDto, UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { GetUsersQueryDto } from '../auth/dto/query.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CustomResponse from '../interfaces/custom-response';
import { UserResponse } from '../users/dto/response.dto';
import { User } from '../users/users.model';
import { RegisterResponse } from 'src/auth/dto/response.dto';
import { ApiOkCustomResponse } from '../decorators/apiresponse.decorator';
import { UserParam } from 'src/auth/user-param.decorator';
import { LoginDto } from 'src/auth/dto/login.dto';
import LogService = require('../logs/logs.service');

@ApiTags('Users')
@Controller('/api')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private logService: LogService,
  ) {}

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  async login(
    @Body() userDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(res);
    try {
      const response = await this.authService.login(userDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Register user',
  })
  @Post('register')
  async register(
    @Body() userDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.authService.register(userDto);
    await this.logService.logRegistration(response.user.id);
    return new RegisterResponse(response.user);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @Get('users')
  async getAll(@Query() query: GetUsersQueryDto) {
    const { users, count: currentCount } =
      await this.userService.getAllUsers(query);
    const totalCount = await this.userService.getTotalCount();

    return new CustomResponse({
      users: users.map((user) => new UserDto(user)),
      totalCount,
      currentCount,
      limit: query.limit,
      page: query.page,
    });
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkCustomResponse(UserResponse)
  @Get('/users/:id')
  async getUserById(@Param('id', new ParseIntPipe()) id: number) {
    const foundUser = await this.userService.getUserById(id);

    return new CustomResponse({
      user: new UserDto(foundUser),
    });
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiOkCustomResponse(UserResponse)
  @Put('/users/:id')
  async updateById(@Param('id') id: string, @Body() userDto: UpdateUserDto) {

    if (userDto.password) {
      userDto.password = await this.authService.getPasswordHash(
        userDto.password,
      );
    }

    const updatedUser = await this.userService.updateUserById(Number(id), userDto);
    await this.logService.logUpdate(Number(id));

    return new CustomResponse({
      user: new UserDto(updatedUser),
    });
  }


  @ApiOperation({ summary: 'Get log by ID' })
  @ApiOkCustomResponse(UserResponse)
  @Get('/logs/:userId')
  async getLogsById(@Param('userId')userId: string,
                    @Query('page') page: number,
                    @Query('limit') limit: number,){
    const logs = await this.logService.getLogsByUserId(userId, page, limit);
    return logs;


  }

}
