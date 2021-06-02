import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { stream, logger } from './logging';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { errorHandler } from './errors/errorHandler';

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

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

export default app;
