import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET_KEY } from '../../common/config';
import { FORBIDDEN } from '../../errors/customErrors';
import * as usersRepo from '../users/user.repository';

const signToken = async (requestedUser:{login:string, password:string}):Promise<{token:string}> => {
  const user = await usersRepo.getByLogin(requestedUser.login);
  if (!user) {
    throw new FORBIDDEN('Bad username/password combination');
  }
  const match = await bcrypt.compare(requestedUser.password, user.password);
  if (!match) {
    throw new FORBIDDEN('Bad username/password combination');
  }
  const payload = { userId: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY || 'secret_key', { expiresIn: 180 });
  return { token };
};

export default signToken;
