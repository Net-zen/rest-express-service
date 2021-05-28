import {IUser, ITask, IBoard} from './types'


interface IDB {
  users: IUser[];
  boards: IBoard[];
  tasks: ITask[]
}
const DB:IDB = {
  users: [],
  boards: [],
  tasks: []
};


const getAllUsers = async ():Promise<IUser[]> => [...DB.users];

const getUser = async (id:string):Promise<IUser | boolean> => {
  const foundUsers = DB.users.filter(user => user.id === id);
  if (foundUsers.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return foundUsers[0] || false;
};

const createUser = async (user:IUser):Promise<IUser | boolean> => {
  DB.users.push(user);
  return getUser(user.id);
};

const updateUser = async (id:string, user:IUser):Promise<IUser | boolean> => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx === -1 ) {
    return false;
  }
  DB.users[idx] = { ...user };
  if (!DB.users[idx]) return false
  DB.users[idx]!.id = id;
  return { ...DB.users[idx]! };
};

const removeUser = async (id:string):Promise<boolean> => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  DB.tasks.forEach((task, i) => {
    if(task.userId === id && DB.tasks[i]) {
      DB.tasks[i]!.userId = null;
    }
  });
  DB.users.splice(idx, 1);
  return true;
};

const getAllBoards = async ():Promise<IBoard[]> => [...DB.boards];

const getBoard = async (id:string):Promise<IBoard | boolean> => {
  const foundBoards = DB.boards.filter(board => board.id === id);
  if (foundBoards.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return foundBoards[0] || false;
};

const createBoard = async (board:IBoard):Promise<IBoard | boolean> => {
  DB.boards.push(board);
  return getBoard(board.id);
};

const updateBoard = async (id:string, board:IBoard):Promise<IBoard | boolean> => {
  const idx = DB.boards.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  DB.boards[idx] = { ...board };
  return { ...DB.boards[idx]! };
};

const getAllTasksByBoard = async (boardId:string):Promise<ITask[]> =>
  DB.tasks.filter(task => task.boardId === boardId);

const getTask = async (id:string):Promise<ITask | boolean> => {
  const foundTasks = DB.tasks.filter(task => task.id === id);
  if (foundTasks.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return foundTasks[0] || false;
};

const createTask = async (task:ITask):Promise<ITask | boolean> => {
  DB.tasks.push(task);
  return getTask(task.id);
};

const updateTaskInBoard = async (boardId:string, id:string, task:ITask):
                                              Promise<ITask | boolean> => {
  const idx = DB.tasks.findIndex(el => el.id === id && el.boardId === boardId);
  if (idx === -1) {
    return false;
  }
  DB.tasks[idx] = { ...task };
  return { ...DB.tasks[idx]! };
};

const removeTask = async (boardId:string, id:string):Promise<boolean> => {
  const idx = DB.tasks.findIndex(
    task => task.boardId === boardId && task.id === id
  );
  if (idx === -1) {
    return false;
  }
  DB.tasks.splice(idx, 1);
  return true;
};

const removeBoard = async (id:string):Promise<boolean> => {
  const idx = DB.boards.findIndex(board => board.id === id);
  if (idx === -1) {
    return false;
  }
  DB.tasks
    .filter(task => task.boardId === id)
    .forEach(task => removeTask(id, task.id));
  DB.boards.splice(idx, 1);
  return true;
};

export { getAllUsers, getUser, createUser, updateUser, removeUser,
         getAllBoards, getBoard, createBoard, updateBoard, removeBoard,
         getAllTasksByBoard, getTask, createTask, updateTaskInBoard, removeTask};
