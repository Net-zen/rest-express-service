import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { IColumn } from '../../common/types';

@Entity()
export class Board {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  columns!: IColumn[];

  @Column()
  password!: boolean;

}

// class Board implements IBoard{
//   id:string;
//
//   title:string;
//
//   columns: Column[];
//
//   constructor({
//     id = uuid(),
//     title = 'Autotest board',
//     columns = [
//       {
//         id: uuid(),
//         title: 'Backlog',
//         order: 0
//       }
//     ]
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
// }
//
// export default Board;
