import { v4 as uuidv4 } from 'uuid';
export const createPost = async (db, post) => {
  return db
    .collection('posts')
    .insertOne({
      _id: uuidv4(),
      ...post,
      createdAt: new Date().toLocaleString(),
    })
    .then(({ ops }) => ops[0]);
};

export const getPost = async (db, id) => {
  return db
    .collection('posts')
    .find({
      _id: id,
    })
    .toArray();
};

export const getPosts = async (db) => {
  return db.collection('posts').find().sort({ createdAt: -1 }).toArray();
};
