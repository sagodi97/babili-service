import db from 'mongodb';
import MongoDB, { dbName } from '../db';

const { ObjectId } = db;

const Users = MongoDB.client.db(dbName).collection('users');

export const create = async (user) => {
  const createdUser = await Users.insertOne(user);
  const { password, ...rest } = createdUser.ops[0];
  return rest;
};

export const usernameExists = async (username) => !!(await Users.findOne({ username }));

export const emailExists = async (email) => !!(await Users.findOne({ email }));

// OPTIMIZE: Unclear how this will behave with a large amount of documents in the collection
export const getAll = async () => {
  const cursor = await Users.find({}, { projection: { password: 0 } });
  const users = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const user of cursor) {
    users.push(user);
  }
  return users;
};

export const getById = async (userId) => {
  const id = ObjectId(userId);
  return Users.findOne({ _id: id }, { projection: { password: 0 } });
};

export const deleteById = async (userId) => {
  const id = ObjectId(userId);
  return Users.deleteOne({ _id: id });
};

export const getByEmail = async (email) => Users.findOne({ email });
