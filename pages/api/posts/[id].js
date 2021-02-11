import nc from 'next-connect';
import { getPost } from '../../../db';
import db from '../../../middleware/db';

const handler = nc();

handler.use(db);

handler.get(async (req, res) => {
  console.log('Request db', req.db);
  const post = await getPost(req.db, req.query.id);

  res.send({ data: post });
});

export default handler;
