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
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() board: BoardDto) {
    return this.boardsService.create(board);
  }

  @Get()
  async findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() board: BoardDto) {
    return this.boardsService.update(id, board);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.boardsService.remove(id);
    return HttpStatus.OK;
  }
}
