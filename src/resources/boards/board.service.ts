import boardRepo from './board.memory.repository';
import { IBoard } from '../../common/types';


const getAll = ():Promise<IBoard[]> => boardRepo.getAll();

const get = (id:string):Promise<IBoard> => boardRepo.get(id);

const create = (board:IBoard):Promise<IBoard> => boardRepo.create(board);

const update = (id:string, board:IBoard):Promise<IBoard> => boardRepo.update(id, board);

const remove = (id:string):Promise<boolean> => boardRepo.remove(id);

export default { getAll, get, create, update, remove };
