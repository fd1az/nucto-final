import nc from 'next-connect';
import { createPost, getPosts } from '../../../db';
import db from '../../../middleware/db';
const handler = nc();

handler.use(db);

handler
  .get(async (req, res) => {
    const posts = await getPosts(req.db);

    res.send({ data: posts });
  })
  .post(async (req, res) => {
    const post = await createPost(req.db, {
      title: req.body.title,
      description: req.body.description,
    });

    res.send({ data: post });
  });

export default handler;
