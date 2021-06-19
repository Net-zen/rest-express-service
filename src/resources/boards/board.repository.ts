import { getRepository } from 'typeorm';
import { Board } from './board.model';
import { NOT_FOUND, BAD_REQUEST } from '../../errors/customErrors';

const getAll = ():Promise<Board[]> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find();
}

const get = async (id:string):Promise<Board> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);
  if (typeof board === 'undefined'){
    throw new NOT_FOUND(`Board with id:${id} not found`);
  }
  return board;
};

const create = async (board:Board):Promise<Board> => {
  const boardRepository = getRepository(Board);
  const createdBoard = await boardRepository.create(board);
  const savedBoard = await boardRepository.save(createdBoard);
  if (typeof savedBoard === 'undefined'){
    throw new BAD_REQUEST(`Something went wrong! Board not created`);
  }
  return createdBoard;
}

const update = async (id:string, board:Board):Promise<Board> => {
  const boardRepository = getRepository(Board);
  const res = await boardRepository.findOne(id);
  if (typeof res === 'undefined'){
    throw new NOT_FOUND(`Board with id:${id} not found`);
  }
  const updatedBoard = await boardRepository.update(id, board);
  return updatedBoard.raw;
};

const remove = async (id:string):Promise<boolean> => {
  const boardRepository = getRepository(Board);
  const removeSuccess = await boardRepository.delete(id);
  if (!removeSuccess.affected) throw new NOT_FOUND();
  return true;
}

export default { getAll, get, create, update, remove };
