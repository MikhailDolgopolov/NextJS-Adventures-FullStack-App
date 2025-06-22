'use client';

import Link from 'next/link';
import TitleSubtitle from '@/components/TitleSubtitle';

import { City } from '@/lib/typeorm/entities/City';
import LoadingError from '@/components/LoadingError';

export default function CitiesPage() {
  const [cities, loading] = useFetch<City[]>('/api/cities');
  if (loading) return <LoadingError loadingObject="города" loading />;
  if (!cities) return <LoadingError loadingObject="города" loading={false} />;

  return (
    <>
      <TitleSubtitle title="Города" />
      <ul>
        {cities.map(city => (
          <li key={city.city}>
            <Link href={`/data/cities/${city.city}`}>
              {city.city}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
