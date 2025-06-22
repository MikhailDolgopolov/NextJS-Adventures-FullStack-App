'use client';

import { useRouter } from 'next/navigation';
import { Country } from '@/lib/typeorm/entities/Country';

export default function CountryRow({ prop }: { prop: Country }) {
  const router = useRouter();

  return (
    <tr className="hoverable" onClick={() => router.push(`/data/countries/${prop.country}`)}>
      <td>{prop.country}</td>
      <td>{prop.population !== 0 && prop.population}</td>
      <td>{prop.area !== 0 && prop.area}</td>
      <td>{prop.capital_city}</td>
    </tr>
  );
}
