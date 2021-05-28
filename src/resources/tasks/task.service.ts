import taskRepo from './task.memory.repository';
import { ITask } from '../../common/types';


const getAll = (boardId:string):Promise<ITask[]> => taskRepo.getAll(boardId);

const get = (id:string):Promise<ITask> => taskRepo.get(id);

const create = (task:ITask):Promise<ITask> => taskRepo.create(task);

const update = (boardId:string, id:string, task:ITask):Promise<ITask> => taskRepo.update(boardId, id, task);

const remove = (boardId:string, id:string):Promise<boolean> => taskRepo.remove(boardId, id);

export default { getAll, get, create, update, remove };
