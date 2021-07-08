import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardDto } from './dto/board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}
  async create(board: BoardDto) {
    const createdBoard = await this.boardsRepository.create(board);
    const savedBoard = await this.boardsRepository.save(createdBoard);
    if (typeof savedBoard === 'undefined') {
      throw new HttpException(
        `Something went wrong! Board not created`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return createdBoard;
  }

  async findAll() {
    return this.boardsRepository.find();
  }

  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id);
    if (typeof board === 'undefined') {
      throw new HttpException(
        `Board with id:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return board;
  }

  async update(id: string, board: BoardDto) {
    const res = await this.boardsRepository.findOne(id);
    if (typeof res === 'undefined') {
      throw new HttpException(
        `Board with id:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedBoard = await this.boardsRepository.update(id, board);
    return updatedBoard.raw;
  }

  async remove(id: string) {
    const removeSuccess = await this.boardsRepository.delete(id);
    if (!removeSuccess.affected) {
      throw new HttpException(
        `Board with id:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }
}
