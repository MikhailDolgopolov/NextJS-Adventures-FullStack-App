import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Trip } from '@/lib/typeorm/entities/Trip';

export async function GET()
 {
  const db = await getDb();
  const repo = db.getRepository(Trip);
  const trips = await repo.find();

  return NextResponse.json(trips);
}