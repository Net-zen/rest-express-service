import { getAllBoards, getBoard, createBoard, updateBoard, removeBoard }
  from '../../common/inMemoryDb';
import { IBoard } from '../../common/types';

const getAll = ():Promise<IBoard[]> => getAllBoards();

const get = async (id:string):Promise<IBoard> => {
  const board = await getBoard(id);
  if (typeof board === 'boolean'){
    throw new Error(`Board with id:${id} not found`);
  }
  return board;
};

const create = async (board:IBoard):Promise<IBoard> => {
  const createdBoard = await createBoard(board);
  if (typeof createdBoard === 'boolean'){
    throw new Error(`Something went wrong! Board not created`);
  }
  return createdBoard;
}

const update = async (id:string, board:IBoard):Promise<IBoard> => {
  const updatedBoard = await updateBoard(id, board);
  if (typeof updatedBoard === 'boolean'){
    throw new Error(`Board with id:${id} not found`);
  }
  return updatedBoard;
};

const remove = (id:string):Promise<boolean> => removeBoard(id);

export default { getAll, get, create, update, remove };
