import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { stream, logger } from './logging/logger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from './resources/login/login.router';
import { errorHandler } from './errors/errorHandler';
import { authenticateToken } from './authentification/authentification';

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use(
  morgan(
    ':protocol :http-version :ip :method :status :url ' +
    'query: :query ' +
    'body: :body size :user-agent :res[content-length] - :response-time ms',
    { stream }
  )
);

process.on('uncaughtException', error => {
  logger.error(`error message = ${JSON.stringify(error.message)}`);
  logger.error(`error stack trace = ${error.stack}`);
  logger.info('Process terminated');
  if (logger.exit)  logger.exit(1);
});

process.on('unhandledRejection', (reason: {message: string, stack: string}) => {
  logger.error(`reject message = ${JSON.stringify(reason.message)}`);
  logger.error(`reject stack trace = ${reason.stack}`);
  logger.info('Process terminated');
  if (logger.exit)  logger.exit(1);

});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use(authenticateToken);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use((_req, res) => {
  res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
});

app.use(errorHandler);

export default app;