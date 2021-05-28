import { getAllUsers, getUser, createUser, updateUser, removeUser }
        from '../../common/inMemoryDb';
import { IUser } from '../../common/types';


const getAll = ():Promise<IUser[]> => getAllUsers();

const get = async (id:string):Promise<IUser> => {
  const user = await getUser(id);
  if (typeof user === 'boolean'){
    throw new Error(`User with id:${id} not found`);
  }
  return user;
};

const create = async (user:IUser):Promise<IUser> => {
  const createdUser = await createUser(user);
  if (typeof createdUser === 'boolean'){
    throw new Error(`Something went wrong! User not created`);
  }
  return createdUser;
}

const update = async (id:string, user:IUser):Promise<IUser> => {
  const updatedUser = await updateUser(id, user);
  if (typeof updatedUser === 'boolean'){
    throw new Error(`User with id:${id} not found`);
  }
  return updatedUser;
}

const remove =  (id:string):Promise<boolean> => removeUser(id);

export default { getAll, get, create, update, remove };
