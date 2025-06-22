import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Country } from '@/lib/typeorm/entities/Country';
import { City } from '@/lib/typeorm/entities/City';
import { Person } from '@/lib/typeorm/entities/Person';
import { Souvenir } from '@/lib/typeorm/entities/Souvenir';
import { Trip } from '@/lib/typeorm/entities/Trip';

export async function GET() {
  const db = await getDb();
  const [
    countries,
    cities,
    people,
    souvenirs,
    numberOfTrips,
    numberOfSouvenirs
  ] = await Promise.all([
    db.getRepository(Country).find(),
    db.getRepository(City).find(),
    db.getRepository(Person).find(),
    db.getRepository(Souvenir).find(),
    db.getRepository(Trip).count(),
    db.getRepository(Souvenir).count()
  ]);

  return NextResponse.json({
    countries,
    cities,
    people,
    souvenirs,
    numberOfTrips,
    numberOfSouvenirs,
  });
}
