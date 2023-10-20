import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { pagginate } from '../utils/pagginate';
import { Op } from 'sequelize';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { GetUsersQueryDto } from '../auth/dto/query.dto';
import { createLikeQuery } from '../utils/createLike';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async createUser(dto: UserDto | RegisterDto) {
    const user = await this.userRepository.create({ ...dto });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }
  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });

    return user;
  }
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async getAllUsers(query: GetUsersQueryDto) {
    const { page, limit } = pagginate(query.page, query.limit);
    const conditions = createLikeQuery(query, ['id', 'email', 'login']);

    const { rows: users, count } = await this.userRepository.findAndCountAll({
      order: [['id', 'asc']],
      where: {
        [Op.and]: conditions,
      },
      limit,
      offset: !limit ? null : limit * (page - 1),
    });

    return { users, count };
  }

  async getTotalCount() {
    return this.userRepository.count();
  }

  async updateUserById(id: number, userDto: UpdateUserDto) {
    const currentUser = await this.getUserById(id);
    const candidate = await this.getUserByEmail(userDto.email);
    const candidateByLogin = await this.getUserByLogin(userDto.login);

    if (candidate && candidate.id !== id)
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );

    if (candidateByLogin && candidateByLogin.id !== id)
      throw new HttpException(
        'User with this login already exists',
        HttpStatus.BAD_REQUEST,
      );

    return currentUser.update(userDto);
  }
}
