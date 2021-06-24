import { getRepository } from 'typeorm';
import { Task, TaskDto } from './task.model';
import { NOT_FOUND, BAD_REQUEST } from '../../errors/customErrors';

const getAll = async (boardId:string):Promise<Task[]> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find({ boardId });
};

const get = async (id:string):Promise<Task> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(id);
  if (typeof task === 'undefined'){
    throw new NOT_FOUND(`Task with id:${id} not found`);
  }
  return task;
};

const create = async (task:TaskDto):Promise<Task> => {
  const taskRepository = getRepository(Task);
  const createdTask = await taskRepository.create(task);
  const savedTask = await taskRepository.save(createdTask);
  if (typeof savedTask === 'undefined'){
    throw new BAD_REQUEST(`Something went wrong! Task not created`);
  }
  return createdTask;
}

const update = async (boardId:string, id:string, task:TaskDto):Promise<Task> => {
  const taskRepository = getRepository(Task);
  const res = await taskRepository.findOne({boardId, id});
  if (typeof res === 'undefined'){
    throw new NOT_FOUND(`Task with id: ${id} not found in board with id: ${boardId}`);
  }
  const updatedTask = await taskRepository.update(id, task);
  return updatedTask.raw;
};

const remove = async (boardId:string, id:string):Promise<boolean> => {
  const taskRepository = getRepository(Task);
  const removeSuccess = await taskRepository.delete({boardId, id});
  if (!removeSuccess.affected) throw new NOT_FOUND();
  return true;
};

const unassignUserTasks = async (userId: string):Promise<void> => {
  const taskRepository = getRepository(Task);
  await taskRepository.update({ userId }, { userId: undefined });
};

const deleteBoardTasks = async (boardId: string):Promise<void> => {
  const taskRepository = getRepository(Task);
  await taskRepository.delete({boardId});
};


export { getAll, get, create, update, remove, unassignUserTasks, deleteBoardTasks };
