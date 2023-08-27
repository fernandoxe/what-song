import { getTrackNames } from '@/services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const trackNames = getTrackNames();
  res.status(200).json(trackNames);
};
