// GET /api/countries/[country]
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Country } from '@/lib/typeorm/entities/Country';

type Params = { country: string };

export async function GET(
  req: Request,
  { params }: { params: Params }     // <-- params is a plain object here
) {
  const db = await getDb();
  const { country: encoded } = params; 
  const country = decodeURIComponent(encoded);

  const repo = db.getRepository(Country);
  const countryObj = await repo.findOneBy({ country });
  if (!countryObj) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(countryObj);
}
