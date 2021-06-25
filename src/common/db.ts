import { createConnection } from 'typeorm';
import config from '../ormconfig'

export const tryConnectToDb = async ():Promise<void> => {
  try {
    await createConnection(config);
  } catch (e) {
    throw new Error(e);
  }
};
