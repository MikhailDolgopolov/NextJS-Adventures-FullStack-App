'use client';

import { useRouter } from 'next/navigation';
import { City } from '@/lib/typeorm/entities/City';

export default function CityRow({ prop }: { prop: City }) {
  const router = useRouter();

  return (
    <tr className="hoverable" onClick={() => router.push(`/data/cities/${prop.city}`)}>
      <td>{prop.city}</td>
      <td>{prop.country}</td>
      <td>{prop.population !== 0 && prop.population}</td>
      <td>{prop.founded_year !== 0 && prop.founded_year}</td>
    </tr>
  );
}
