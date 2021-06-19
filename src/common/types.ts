interface IUser {
  id: string;
  name:string;
  login:string;
  password?:string;
}

interface ITask {
  id:string;
  title:string;
  order:string;
  description:string;
  userId:string | null;
  boardId:string | null;
  columnId:string | null;
}


interface IColumn {
  id:string;
  title: string;
  order: number
}

interface IBoard {
  id:string;
  title:string;
  columns: IColumn[];
}


interface IcustomError {
  status: number;
  message: string;
  stack?: string;
}

export {IUser, ITask, IColumn, IBoard, IcustomError}
