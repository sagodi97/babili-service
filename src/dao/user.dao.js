import db from 'mongodb';
import MongoDB, { dbName } from '../db';

const { ObjectId } = db;

const Users = MongoDB.client.db(dbName).collection('users');

export const create = async (user) => Users.insertOne(user);

export const usernameExists = async (username) => !!(await Users.findOne({ username }));

export const emailExists = async (email) => !!(await Users.findOne({ email }));

// OPTIMIZE: Unclear how this will behave with a large amount of documents in the collection
export const getAll = async () => {
  const cursor = await Users.find();
  const users = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const user of cursor) {
    users.push(user);
  }
  return users;
};

export const getById = async (userId) => {
  const id = ObjectId(userId);
  return Users.findOne({ _id: id });
};

export const deleteById = async (userId) => {
  const id = ObjectId(userId);
  return Users.deleteOne({ _id: id });
};
