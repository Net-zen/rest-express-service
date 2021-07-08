import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async login(userDto: UserDto) {
    const user = await this.userService.getByLogin(userDto.login);
    if (!user) {
      throw new HttpException(
        'Bad username/password combination',
        HttpStatus.FORBIDDEN,
      );
    }
    const match = await bcrypt.compare(userDto.password, user.password);
    if (!match) {
      throw new HttpException(
        'Bad username/password combination',
        HttpStatus.FORBIDDEN,
      );
    }
    const payload = { userId: user.id, login: user.login };
    const token = await this.jwtService.sign(payload);
    return { token };
  }
}
