import { NextRequest, NextResponse } from 'next/server';
import { getRandomNLines } from '@/services';

export async function GET(req: NextRequest, {params}: {params: {count: string}}) {
  const { count } = params;
  const bridges = getRandomNLines(Number(count) || 1);
  return NextResponse.json(bridges);
};
