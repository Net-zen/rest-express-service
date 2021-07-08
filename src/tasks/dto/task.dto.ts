import { Task } from '../entities/task.entity';

export type TaskDto = Omit<Task, 'id'>;
