import * as boardRepo from './board.repository';
import { Board, BoardDto } from './board.model';
import { deleteBoardTasks } from '../tasks/task.repository';


const getAll = ():Promise<Board[]> => boardRepo.getAll();

const get = (id:string):Promise<Board> => boardRepo.get(id);

const create = (board:BoardDto):Promise<Board> => boardRepo.create(board);

const update = (id:string, board:BoardDto):Promise<Board> => boardRepo.update(id, board);

const remove = async (id:string):Promise<boolean> => {
  await deleteBoardTasks(id);
  return boardRepo.remove(id);
};

export default { getAll, get, create, update, remove };
