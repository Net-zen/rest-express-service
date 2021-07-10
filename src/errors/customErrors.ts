import { ReasonPhrases, StatusCodes } from 'http-status-codes';

interface IcustomError {
  status: number;
  message: string;
  stack?: string;
}

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

class FORBIDDEN extends Error implements IcustomError  {

  status: number;

  message: string;

  constructor(message: string = ReasonPhrases.FORBIDDEN) {
    super(message);
    this.status = StatusCodes.FORBIDDEN;
    this.message = message;
  }
}

class UNAUTHORIZED extends Error implements IcustomError  {

  status: number;

  message: string;

  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
    this.message = message;
  }
}

export { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, IcustomError };
