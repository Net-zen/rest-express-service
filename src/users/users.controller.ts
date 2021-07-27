import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { toResponse } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.create(user);
    return toResponse(createdUser);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(toResponse);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);
    return toResponse(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) user: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(id, user);
    return toResponse(updatedUser);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.remove(id);
    return HttpStatus.OK;
  }
}
