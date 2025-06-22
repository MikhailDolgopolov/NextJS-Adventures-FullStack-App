import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Trip } from '@/lib/typeorm/entities/Trip';

export async function GET(
  request: Request,
  { params }: { params: { year: string } }
) {
  const yearNum = parseInt(params.year, 10);
  if (isNaN(yearNum)) {
    return NextResponse.json({ error: 'Invalid year' }, { status: 400 });
  }

  const db = await getDb();
  const repo = db.getRepository(Trip);
  const trips = await repo.find({ where: { year: yearNum } });

  return NextResponse.json(trips);
}