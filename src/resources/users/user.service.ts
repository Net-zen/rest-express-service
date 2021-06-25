import bcrypt from 'bcrypt';
import * as usersRepo from './user.repository';
import { User, UserDto } from './user.model';


const getAll = ():Promise<User[]> => usersRepo.getAll();

const get = (id:string):Promise<User> => usersRepo.get(id);

const create = async (user:UserDto):Promise<User> => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(user.password, salt)
  return usersRepo.create({ ...user, password });
};

const update = (id:string, user:UserDto):Promise<User> => usersRepo.update(id, user);

const remove =  (id:string):Promise<boolean> => usersRepo.remove(id);

const createAdmin = async ():Promise<void> => {
  await create({
    name: 'admin',
    login: 'admin',
    password:'admin'
  });
};

export default { getAll, get, create, update, remove, createAdmin };
