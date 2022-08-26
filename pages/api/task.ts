import { deleteTask, insertTask } from '@/utils/supabase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await insertTask(req.body.task, req.body.user_id, req.body.order);
    res.status(200).send('success');
  } else if (req.method === 'PUT') {
  } else if (req.method === 'DELETE') {
    await deleteTask(req.body.taskId);
    res.status(200).send('success');
  }
}
