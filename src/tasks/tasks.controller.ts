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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body(new ValidationPipe()) task: TaskDto,
  ) {
    return this.tasksService.create({ ...task, boardId });
  }

  @Get(':boardId/tasks')
  findAll(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':boardId/tasks/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':boardId/tasks/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body(new ValidationPipe()) task: TaskDto,
  ) {
    return this.tasksService.update(boardId, id, task);
  }

  @Delete(':boardId/tasks/:id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('boardId', ParseUUIDPipe) boardId: string,
  ) {
    await this.tasksService.remove(boardId, id);
    return HttpStatus.OK;
  }
}
