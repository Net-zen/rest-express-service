import * as boardRepo from './board.repository';
import { Board, BoardDto } from './board.model';


const getAll = ():Promise<Board[]> => boardRepo.getAll();

const get = (id:string):Promise<Board> => boardRepo.get(id);

const create = (board:BoardDto):Promise<Board> => boardRepo.create(board);

const update = (id:string, board:BoardDto):Promise<Board> => boardRepo.update(id, board);

const remove = (id:string):Promise<boolean> => boardRepo.remove(id);

export default { getAll, get, create, update, remove };
