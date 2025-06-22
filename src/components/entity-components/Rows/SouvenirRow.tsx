'use client';

import { Souvenir } from '@/lib/typeorm/entities/Souvenir';
import SouvenirModal from '@/components/entity-components/Modals/SouvenirModal';

export default function SouvenirRow({ s }: { s: Souvenir }) {

  return (
      <SouvenirModal s={s} trigger={
      <tr className="hoverable">
        <td>{s.name}</td>
        <td>{s.city}</td>
        <td>{s.type}</td>
        <td>{s.material}</td>
      </tr>
    } />
  );
}
