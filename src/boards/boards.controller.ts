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
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() board: BoardDto) {
    return this.boardsService.create(board);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() board: BoardDto) {
    return this.boardsService.update(id, board);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.boardsService.remove(id);
    return HttpStatus.OK;
  }
}
