'use client';

import Link from 'next/link';
import TitleSubtitle from '@/components/TitleSubtitle';
import useFetch from '@/hooks/useFetch';
import LoadingError from '@/components/LoadingError';
import { Country } from '@/lib/typeorm/entities/Country';

export default function CountriesPage() {
  const [countries, loading] = useFetch<Country[]>('/api/countries');

  if (loading) return <LoadingError loadingObject="страны" loading />;
  if (!countries) return <LoadingError loadingObject="страны" loading={false} />;

  return (
    <>
      <TitleSubtitle title="Страны" />
      <ul>
        {countries.map(country => (
          <li key={country.country}>
            <Link href={`/data/countries/${country.country}`}>
              {country.country}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
