import { insertTask } from '@/utils/supabase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { task, order, user_id } = req.body;
  if (req.method === 'POST') {
    await insertTask(task, user_id, order);
    res.status(200).send('success');
  } else if (req.method === 'PUT') {
  }
}
