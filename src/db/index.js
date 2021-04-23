import db from 'mongodb';
import logger from '../utils/logger';

const { MongoClient } = db;

const {
  DB_USER, DB_PASSWORD, DB_NAME, DB_HOST,
} = process.env;

const client = new MongoClient(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const connect = async () => {
  try {
    await client.connect();
    await client.db(DB_NAME).command({ ping: 1 });
    logger.info('Connected successfully to MongoDB');
  } catch (error) {
    logger.error(error);
  }
};
export { DB_NAME as dbName };
export default { connect, client };
