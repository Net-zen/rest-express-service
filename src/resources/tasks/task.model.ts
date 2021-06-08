import { v4 as uuid } from 'uuid';
import { ITask } from '../../common/types';

class Task implements ITask{
  id:string;

  title:string;

  order:string;

  description:string;

  userId:string | null;

  boardId:string | null;

  columnId:string | null;

  constructor({
    id = uuid(),
    title = 'TASK',
    order = '0',
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
