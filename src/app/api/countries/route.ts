// GET /api/countries/[country]
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/init-db';
import { Country } from '@/lib/typeorm/entities/Country';

export async function GET(req: Request, { params }: { params: { country: string } }) {
  const db = await getDb();
  const repo = db.getRepository(Country);
  const countryObj = await repo.findOneBy({ country: params.country });
  if (!countryObj) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(countryObj);
}
