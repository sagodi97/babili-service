import db from 'mongodb';
import MongoDB, { dbName } from '../db';

const { ObjectId } = db;

const Users = MongoDB.client.db(dbName).collection('users');

export const create = async (user) => {
  await Users.insertOne(user);
};

export const usernameExists = async (username) => !!(await Users.findOne({ username }));

export const emailExists = async (email) => !!(await Users.findOne({ email }));

export const getAll = async () => Users.find({});

export const getById = async (userId) => {
  const id = ObjectId(userId);
  return Users.findOne({ _id: id });
};
