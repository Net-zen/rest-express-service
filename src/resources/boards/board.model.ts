import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Board {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('json', {nullable: true})
  columns!: string;
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
