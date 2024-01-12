import { NextRequest, NextResponse } from 'next/server';
import { getRandomNWords } from '@/services';

export async function GET(req: NextRequest, {params}: {params: {count: string}}) {
  const { count } = params;
  const bridges = getRandomNWords(Number(count) || 1);
  return NextResponse.json(bridges);
};
