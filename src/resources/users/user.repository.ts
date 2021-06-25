import { getRepository } from "typeorm";
import { User, UserDto } from './user.model';
import { NOT_FOUND, BAD_REQUEST } from '../../errors/customErrors';

const getAll = ():Promise<User[]> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

const get = async (id:string):Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  if (typeof user === 'undefined'){
    throw new NOT_FOUND(`User with id:${id} not found`);
  }
  return user;
};

const create = async (user:UserDto):Promise<User> => {
  const userRepository = getRepository(User);
  const createdUser = userRepository.create(user);
  const savedUser = await userRepository.save(createdUser);
  if (typeof savedUser === 'undefined'){
    throw new BAD_REQUEST(`Something went wrong! User not created`);
  }
  return savedUser;
};

const update = async (id:string, user:UserDto):Promise<User> => {
  const userRepository = getRepository(User);
  const res = await userRepository.findOne(id);
  if (typeof res === 'undefined'){
    throw new NOT_FOUND(`User with id:${id} not found`);
  }
  const updatedUser = await userRepository.update(id, user);
  return updatedUser.raw;
};

const remove = async (id:string):Promise<boolean> => {
  const userRepository = getRepository(User);
  const removeSuccess = await userRepository.delete(id);
  if (!removeSuccess.affected) throw new NOT_FOUND();
  return true;
};

const getByLogin = async (login:string):Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ login });
};


export { getAll, get, create, update, remove, getByLogin };
