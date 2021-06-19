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

