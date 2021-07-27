import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async create(task: TaskDto) {
    const createdTask = await this.tasksRepository.create(task);
    const savedTask = await this.tasksRepository.save(createdTask);
    if (typeof savedTask === 'undefined') {
      throw new HttpException(
        `Something went wrong! Task not created`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return createdTask;
  }

  async findAll(boardId: string) {
    return this.tasksRepository.find({ boardId });
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne(id);
    if (typeof task === 'undefined') {
      throw new HttpException(
        `Task with id:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return task;
  }

  async update(boardId: string, id: string, task: TaskDto) {
    const res = await this.tasksRepository.findOne({ boardId, id });
    if (typeof res === 'undefined') {
      throw new HttpException(
        `Task with id: ${id} not found in board with id: ${boardId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedTask = await this.tasksRepository.update(id, task);
    return updatedTask.raw;
  }

  async remove(boardId: string, id: string) {
    const removeSuccess = await this.tasksRepository.delete({ boardId, id });
    if (!removeSuccess.affected) {
      throw new HttpException(
        `Task with id: ${id} not found in board with id: ${boardId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }
}
