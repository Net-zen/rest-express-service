import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Task {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order?: number = 1;

  @Column()
  description!: string;

  @Column({nullable: true})
  userId!: string;

  @Column({nullable: true})
  boardId!: string;

  @Column({nullable: true})
  columnId!: string;
}

// class Task implements ITask{
//   id:string;
//
//   title:string;
//
//   order:string;
//
//   description:string;
//
//   userId:string | null;
//
//   boardId:string | null;
//
//   columnId:string | null;
//
//   constructor({
//     id = uuid(),
//     title = 'TASK',
//     order = '0',
//     description = 'description',
//     userId = null,
//     boardId = null,
//     columnId = null
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }
//
// export default Task;
