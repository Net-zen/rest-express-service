import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../errors/customErrors';
import { JWT_SECRET_KEY } from '../common/config';

const authenticateToken:RequestHandler = async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UNAUTHORIZED('Wrong authenticate scheme!');
  }
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') {
    throw new UNAUTHORIZED('Wrong authenticate scheme!');
  }
  if (!token) {
    throw new UNAUTHORIZED('Failed to authenticate token');
  }

  try {
    jwt.verify(token, JWT_SECRET_KEY || 'secret-key');
  } catch (e) {
    throw new UNAUTHORIZED('Failed to authenticate token');
  }
  next();
};

export { authenticateToken };
