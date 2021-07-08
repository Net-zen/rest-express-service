import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(user: UserDto): Promise<User> {
    const existUser = await this.getByLogin(user.login);
    if (existUser) {
      throw new HttpException(
        `User with login ${user.login} already registered`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdUser = this.usersRepository.create(user);
    const savedUser = this.usersRepository.save(createdUser);
    if (typeof savedUser === 'undefined') {
      throw new HttpException(
        `Something went wrong! User not created`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return savedUser;
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (typeof user === 'undefined') {
      throw new HttpException(
        `User with id:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: string, user: UserDto) {
    const res = await this.usersRepository.findOne(id);
    if (typeof res === 'undefined') {
      throw new HttpException(
        `User with id:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedUser = await this.usersRepository.update(id, user);
    return updatedUser.raw;
  }

  async remove(id: string) {
    const removeSuccess = await this.usersRepository.delete(id);
    if (!removeSuccess.affected) {
      throw new HttpException(
        `User with id:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }
  async getByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ login });
  }
}
