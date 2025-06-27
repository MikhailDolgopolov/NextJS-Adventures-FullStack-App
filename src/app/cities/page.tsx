import Link from 'next/link';
import TitleSubtitle from '@/components/TitleSubtitle';

import { City } from '@/lib/typeorm/entities/City';
import LoadingError from '@/components/LoadingError';
import { getDb } from '@/lib/db';

export default async function CitiesPage() {
  const db = await getDb();
  
  const allCities = await db.getRepository(City).find();

  
  if (!allCities) return <LoadingError loadingObject="города" loading={false} />;

  return (
    <>
      <TitleSubtitle title="Города" />
      <ul>
        {allCities.map(city => (
          <li key={city.city}>
            <Link href={`/cities/${city.city}`}>
              {city.city}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
