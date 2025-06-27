import Link from 'next/link';
import TitleSubtitle from '@/components/TitleSubtitle';

import LoadingError from '@/components/LoadingError';
import { Country } from '@/lib/typeorm/entities/Country';
import { getDb } from '@/lib/db';

export default async function CountriesPage() {
  const db = await getDb();
    
    const allCountries = await db.getRepository(Country).find();
  
  if (!allCountries) return <LoadingError loadingObject="страны" loading={false} />;

  return (
    <>
      <TitleSubtitle title="Страны" />
      <ul>
        {allCountries.map(country => (
          <li key={country.country}>
            <Link href={`/countries/${country.country}`}>
              {country.country}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
