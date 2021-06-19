import usersRepo from './user.repository';
import { User } from './user.model';


const getAll = ():Promise<User[]> => usersRepo.getAll();

const get = (id:string):Promise<User> => usersRepo.get(id);

const create = (user:User):Promise<User> => usersRepo.create(user);

const update = (id:string, user:User):Promise<User> => usersRepo.update(id, user);

const remove =  (id:string):Promise<boolean> => usersRepo.remove(id);

export default { getAll, get, create, update, remove };
