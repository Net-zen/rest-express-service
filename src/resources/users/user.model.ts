import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: boolean;

}

export const toResponse = (user:User):Omit<User, 'password'> => {
  const { id, name, login } = user;
  return { id, name, login };
};

// import { v4 as uuid } from 'uuid';
// import { IUser } from '../../common/types';
//
// class User implements IUser{
//
//   id:string;
//
//   name:string;
//
//   login:string;
//
//   password:string
//
//
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'P@55w0rd'
//   } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }
//
//   static toResponse(user:IUser):IUser {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
//
// }
//
// export default User;
