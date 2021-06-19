import * as taskRepo from './task.repository';
import { Task } from './task.model';


const getAll = (boardId:string):Promise<Task[]> => taskRepo.getAll(boardId);

const get = (id:string):Promise<Task> => taskRepo.get(id);

const create = (task:Task):Promise<Task> => taskRepo.create(task);

const update = (boardId:string, id:string, task:Task):Promise<Task> => taskRepo.update(boardId, id, task);

const remove = (boardId:string, id:string):Promise<boolean> => taskRepo.remove(boardId, id);

export default { getAll, get, create, update, remove };
