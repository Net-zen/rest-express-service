import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;
}

export const toResponse = (user: User): Omit<User, 'password'> => {
  const { id, name, login } = user;
  return { id, name, login };
};
