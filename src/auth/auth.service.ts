import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(userDto: LoginDto) {
    const user = (await this.validateUser(userDto)) as User;

    await user.save();
    return;
    user: new UserDto(user);
  }

  async register(userDto: RegisterDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    const candidateByUsername = await this.usersService.getUserByLogin(
      userDto.login,
    );

    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (candidateByUsername) {
      throw new HttpException(
        'User with this login already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, +process.env.SALT);

    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });

    await user.save();

    return {
      user: new UserDto(user),
    };
  }

  async comparePasswords(
    firstPass: string,
    secondPass: string,
  ): Promise<boolean> {
    return bcrypt.compare(firstPass, secondPass);
  }

  getPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, +process.env.SALT);
  }

  private async validateUser(userDto: LoginDto) {
    let user: User;
    user = await this.usersService.getUserByEmail(userDto.login);
    if (!user) user = await this.usersService.getUserByLogin(userDto.login);

    if (!user) {
      throw new HttpException('Player not found!', HttpStatus.BAD_REQUEST);
    }

    const passwordEquals = await this.comparePasswords(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) return user;

    throw new HttpException(
      'Email or password are wrong!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
