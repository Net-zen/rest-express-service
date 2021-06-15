import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IcustomError } from '../common/types';
import { logger } from '../logging/logger';

const errorHandler = (err:IcustomError, _req:Request, res:Response, next:NextFunction):void => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(`error.status: 500 : error: ${err.stack || err.message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Okay, Houston, we've had a problem here.");
  }
  next();
};

export { errorHandler };
