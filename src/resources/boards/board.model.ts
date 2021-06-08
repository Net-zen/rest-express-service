import { v4 as uuid } from 'uuid';
import { Column, IBoard } from '../../common/types';

class Board implements IBoard{
  id:string;

  title:string;

  columns: Column[];

  constructor({
    id = uuid(),
    title = 'Autotest board',
    columns = [
      {
        id: uuid(),
        title: 'Backlog',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
