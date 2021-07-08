import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { toResponse } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: UserDto) {
    const createdUser = await this.usersService.create(user);
    return toResponse(createdUser);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return toResponse(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto) {
    const user = await this.usersService.update(id, userDto);
    return toResponse(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return HttpStatus.OK;
  }
}
