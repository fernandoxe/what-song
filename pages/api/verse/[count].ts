import { getRandomNVerses } from '@/services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { count } = req.query;
  const verses = getRandomNVerses(Number(count) || 1);
  res.status(200).json(verses);
};
