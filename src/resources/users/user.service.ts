import usersRepo from './user.memory.repository';
import { IUser } from '../../common/types';


const getAll = ():Promise<IUser[]> => usersRepo.getAll();

const get = (id:string):Promise<IUser> => usersRepo.get(id);

const create = (user:IUser):Promise<IUser> => usersRepo.create(user);

const update = (id:string, user:IUser):Promise<IUser> => usersRepo.update(id, user);

const remove =  (id:string):Promise<boolean> => usersRepo.remove(id);

export default { getAll, get, create, update, remove };
