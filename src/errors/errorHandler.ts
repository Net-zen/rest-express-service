import { Request, Response, NextFunction } from 'express';
import { IcustomError } from './customErrors';
import { logger } from '../logging';

const errorHandler = (err:IcustomError, _req:Request, res:Response, next:NextFunction) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(`error.status: 500 : error: ${err.stack || err.message}`);
    res.status(500).send("Okay, Houston, we've had a problem here.");
  }
  next();
};

export { errorHandler };
