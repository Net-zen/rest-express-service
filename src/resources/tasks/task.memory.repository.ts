import { getAllTasksByBoard, getTask, createTask, updateTaskInBoard, removeTask }
  from '../../common/inMemoryDb';
import { ITask } from '../../common/types';

const getAll = async (boardId:string):Promise<ITask[]> => getAllTasksByBoard(boardId);

const get = async (id:string):Promise<ITask> => {
  const task = await getTask(id);
  if (typeof task === 'boolean'){
    throw new Error(`Task with id:${id} not found`);
  }
  return task;
};

const create = async (task:ITask):Promise<ITask> => {
  const createdTask = await createTask(task);
  if (typeof createdTask === 'boolean'){
    throw new Error(`Something went wrong! Task not created`);
  }
  return createdTask;
}

const update = async (boardId:string, id:string, task:ITask):Promise<ITask> => {
  const updatedTask = await updateTaskInBoard(boardId, id, task);
  if (typeof updatedTask === 'boolean'){
    throw new Error(`Task with id:${id} not found`);
  }
  return updatedTask;
};

const remove = (boardId:string, id:string):Promise<boolean> => removeTask(boardId, id);


export default { getAll, get, create, update, remove };
