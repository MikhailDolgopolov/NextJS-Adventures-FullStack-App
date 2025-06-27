import { City } from '@/lib/typeorm/entities/City';
import { Sight } from '@/lib/typeorm/entities/Sight';
import { Souvenir } from '@/lib/typeorm/entities/Souvenir';
import { getDb } from '@/lib/db';
import CityPageClient from './CityPageClient';
import { notFound } from 'next/navigation';

type Params = { city: string };

export default async function CityPage({ params }: { params: Params }) {
  const { city } = params;
  const db = await getDb();

  const cityObj = await db.getRepository(City).findOneBy({ city });
  if (!cityObj) {
    // You can render a 404 page or error here
    return notFound();
  }

  const [souvenirs, sights] = await Promise.all([
    db.getRepository(Souvenir).find({ where: { city } }),
    db.getRepository(Sight).find({ where: { city } }),
  ]);

  return (
    <CityPageClient
      city={cityObj}
      initialSouvenirs={souvenirs}
      initialSights={sights}
    />
  );
}
