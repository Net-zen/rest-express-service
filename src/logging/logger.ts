import winston from 'winston';
import 'winston-daily-rotate-file';
import morgan, { StreamOptions } from 'morgan';
import { IncomingMessage } from 'http';
import { NODE_ENV } from '../common/config';

interface IRequest extends IncomingMessage {
  body: {
    password: string;
  };
  query: string;
  ip: string;
  protocol: string;
}

interface Ilogger extends winston.Logger {
  exit?: (exitCode: number) => void
}

morgan.token('body', (req: IRequest) =>
  JSON.stringify(
    req.body.password ? { ...req.body, password: '******' } : req.body
  )
);

morgan.token('query', (req: IRequest) => JSON.stringify(req.query));

morgan.token('ip', (req: IRequest) => JSON.stringify(req.ip));

morgan.token('protocol', (req: IRequest) => JSON.stringify(req.protocol));

morgan.token('host', req => req.headers.host);

const options = {
  file: {
    json: true,
    datePattern: 'DD-MM-YYYY',
    handleExceptions: false,
    handleRejections: false,
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '7d'
  },
  console: {
    level: 'debug',
    handleExceptions: false,
    handleRejections: false,
    json: false,
    colorize: true
  }
};

const infoTransport = new winston.transports.DailyRotateFile({
  ...options.file,
  level: 'info',
  filename: `${__dirname}/../../logs/rest-service-info-%DATE%.log`
});

const errorTransport = new winston.transports.DailyRotateFile({
  ...options.file,
  level: 'error',
  filename: `${__dirname}/../logs/rest-service-ERRORS-%DATE%.log`
});

const timestampFormat = () =>
  new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Omsk',
    hour12: false
  });

const logger:Ilogger = winston.createLogger({
  transports: [infoTransport, errorTransport],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.combine(),
    winston.format.timestamp({
      format: timestampFormat
    }),
    winston.format.printf(
      info => `[${info['timestamp']} UTC+6] ${info.level}: ${info.message}`
    )
  ),
  exitOnError: false
});

logger.exit = (exitCode: number): void => {
  infoTransport.on('finish', () => process.exit(exitCode));
  if (infoTransport.close)  infoTransport.close();

};

if (NODE_ENV === 'development') {
  logger.add(new winston.transports.Console(options.console));
}

const stream: StreamOptions = {
  write: (message) => {
    logger.info(message);
  },
};

export { stream, logger };
