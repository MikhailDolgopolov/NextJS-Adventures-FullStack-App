import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Trip } from '@/lib/typeorm/entities/Trip';
import { Raw } from 'typeorm';

export async function GET(
  request: Request,
  { params }: { params: { year: string } }
) {
  const data = await params
  const yearNum = parseInt(data.year, 10);
  if (isNaN(yearNum)) {
    return NextResponse.json({ error: 'Invalid year' }, { status: 400 });
  }

  const db = await getDb();
  const repo = db.getRepository(Trip);
  // Use Raw SQL to extract year from start_date
  const trips = await repo.find({
    where: {
      start_date: Raw((alias) => `EXTRACT(YEAR FROM ${alias}) = ${yearNum}`),
    },
  });

  return NextResponse.json(trips);
}