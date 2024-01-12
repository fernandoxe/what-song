import { NextRequest, NextResponse } from 'next/server';
import { getTrackNames } from '@/services';

export async function GET(req: NextRequest) {
  const trackNames = getTrackNames();
  return NextResponse.json(trackNames);
};
