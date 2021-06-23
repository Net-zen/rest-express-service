import { PORT } from './common/config';
import app from './app';
import { tryConnectToDb } from './common/db';
import { logger } from './logging/logger';
import { createAdmin } from './resources/users/user.repository';

tryConnectToDb()
  .then(() => {
    logger.info('Connected to DB')
    createAdmin();
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    throw new Error(err)
  });

