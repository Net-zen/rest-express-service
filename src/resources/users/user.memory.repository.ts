import { getAllUsers, getUser, createUser, updateUser, removeUser }
        from '../../common/inMemoryDb';
import { IUser } from '../../common/types';
import { NOT_FOUND, BAD_REQUEST } from '../../errors/customErrors';


const getAll = ():Promise<IUser[]> => getAllUsers();

const get = async (id:string):Promise<IUser> => {
  const user = await getUser(id);
  if (typeof user === 'boolean'){
    throw new NOT_FOUND(`User with id:${id} not found`);
  }
  return user;
};

const create = async (user:IUser):Promise<IUser> => {
  const createdUser = await createUser(user);
  if (typeof createdUser === 'boolean'){
    throw new BAD_REQUEST(`Something went wrong! User not created`);
  }
  return createdUser;
}

const update = async (id:string, user:IUser):Promise<IUser> => {
  const updatedUser = await updateUser(id, user);
  if (typeof updatedUser === 'boolean'){
    throw new NOT_FOUND(`User with id:${id} not found`);
  }
  return updatedUser;
}

const remove = async (id:string):Promise<boolean> => {
  const removeSuccess = await removeUser(id);
  if (!removeSuccess) throw new NOT_FOUND();
  return true;
};

export default { getAll, get, create, update, remove };
