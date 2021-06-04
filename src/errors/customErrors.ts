import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { IcustomError } from '../common/types';

class NOT_FOUND extends Error implements IcustomError {

  status: number;

  message: string;

  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
    this.message = message;
  }
}

class BAD_REQUEST extends Error implements IcustomError  {

  status: number;

  message: string;

  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
    this.message = message;
  }
}

export { NOT_FOUND, BAD_REQUEST, IcustomError };
