import { NextRequest, NextResponse } from 'next/server';
import { getRandomNChorus } from '@/services';

export async function GET(req: NextRequest, {params}: {params: {count: string}}) {
  const { count } = params;
  const bridges = getRandomNChorus(Number(count) || 1);
  return NextResponse.json(bridges);
};
