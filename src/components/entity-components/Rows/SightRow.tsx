'use client';

import { Sight } from '@/lib/typeorm/entities/Sight';
import SightModal from '@/components/entity-components/Modals/SightModal';

export default function SightRow({ s }: { s: Sight }) {

  return (
      <SightModal s={s} trigger={
        <tr className="hoverable">
            <td>{s.name}</td>
            <td>{s.city}</td>
            <td>{s.type}</td>
      </tr>
    } />
  );
}
