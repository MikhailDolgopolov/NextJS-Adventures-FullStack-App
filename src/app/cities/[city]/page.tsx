// src/app/cities/[city]/page.tsx

import { notFound } from 'next/navigation';
import CityPageClient from './CityPageClient';
import { getDb } from '@/lib/db';
import { City } from '@/lib/typeorm/entities/City';
import { Souvenir } from '@/lib/typeorm/entities/Souvenir';
import { Sight } from '@/lib/typeorm/entities/Sight';

type Params = { city: string };

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;           // <-- params is a Promise!
}) {
  const { city: encodedCity } = await params;  // <-- await here
  const city = decodeURIComponent(encodedCity);

  const db = await getDb();
  const cityObj = await db.getRepository(City).findOneBy({ city });
  if (!cityObj) return notFound();

  const [souvenirs, sights] = await Promise.all([
    db.getRepository(Souvenir).find({ where: { city } }),
    db.getRepository(Sight).find({ where: { city } }),
  ]);

  // Serialize out of class instances
  const plainCity = JSON.parse(JSON.stringify(cityObj));
  const plainSouvenirs = JSON.parse(JSON.stringify(souvenirs));
  const plainSights = JSON.parse(JSON.stringify(sights));

  return (
    <CityPageClient
      city={plainCity}
      initialSouvenirs={plainSouvenirs}
      initialSights={plainSights}
    />
  );
}
