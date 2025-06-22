
import { NextResponse } from 'next/server';
import { Trip } from '@/lib/typeorm/entities/Trip';
import { getDb } from '@/lib/db';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const data = await req.json() as Trip;
    const db = await getDb();
    const repo = db.getRepository(Trip);

    const newTrip = repo.create(data);
    const savedTrip = await repo.save(newTrip);

    return NextResponse.json(savedTrip, { status: 201 });
  } catch (err) {
    console.error('Trip creation failed:', err);
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 });
  }
}
