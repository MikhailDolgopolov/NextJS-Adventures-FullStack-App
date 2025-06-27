
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Country } from '@/lib/typeorm/entities/Country';

export async function GET() {
  const db = await getDb();

  const repo = db.getRepository(Country);
  const countries = await repo.find();

  return NextResponse.json(countries);
}
