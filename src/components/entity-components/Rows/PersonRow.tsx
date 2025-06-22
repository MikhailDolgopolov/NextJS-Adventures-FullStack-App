'use client';

import { useRouter } from 'next/navigation';
import { Person } from '@/lib/typeorm/entities/Person';

export default function PersonRow({ prop }: { prop: Person }) {
  const router = useRouter();

  return (
    <tr className="hoverable" onClick={() => router.push(`/data/people/${prop.person_id}`)}>
      <td>{prop.alias}</td>
      <td>{prop.first_name}</td>
      <td>{prop.last_name}</td>
    </tr>
  );
}
