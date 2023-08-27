import { getRandomNWords } from '@/services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { count } = req.query;
  const words = getRandomNWords(Number(count) || 1);
  res.status(200).json(words);
};
