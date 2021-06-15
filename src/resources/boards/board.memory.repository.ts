import { getAllBoards, getBoard, createBoard, updateBoard, removeBoard }
  from '../../common/inMemoryDb';
import { IBoard } from '../../common/types';
import { NOT_FOUND, BAD_REQUEST } from '../../errors/customErrors';

const getAll = ():Promise<IBoard[]> => getAllBoards();

const get = async (id:string):Promise<IBoard> => {
  const board = await getBoard(id);
  if (typeof board === 'boolean'){
    throw new NOT_FOUND(`Board with id:${id} not found`);
  }
  return board;
};

const create = async (board:IBoard):Promise<IBoard> => {
  const createdBoard = await createBoard(board);
  if (typeof createdBoard === 'boolean'){
    throw new BAD_REQUEST(`Something went wrong! Board not created`);
  }
  return createdBoard;
}

const update = async (id:string, board:IBoard):Promise<IBoard> => {
  const updatedBoard = await updateBoard(id, board);
  if (typeof updatedBoard === 'boolean'){
    throw new NOT_FOUND(`Board with id:${id} not found`);
  }
  return updatedBoard;
};

const remove = async (id:string):Promise<boolean> => {
  const removeSuccess = await removeBoard(id);
  if (!removeSuccess) throw new NOT_FOUND();
  return true;
}

export default { getAll, get, create, update, remove };
