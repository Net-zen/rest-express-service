import { PORT } from './common/config';
import app from './app';
import { tryConnectToDb } from './common/db';
import { logger } from './logging/logger';

tryConnectToDb()
  .then(() => {
    logger.info('Connected to DB')
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    throw new Error(err)
  });

