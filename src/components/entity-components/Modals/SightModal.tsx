'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sight } from '@/lib/typeorm/entities/Sight';
import CustomModal from '@/components/CustomModal';

export default function SightModal({ s, trigger }: { s: Sight; trigger: React.ReactNode }) {
  const router = useRouter();

  return (
    <CustomModal header={s.name} trigger={trigger}>
      <div className="vert-window">
        <div className="form-row">
          <label>Название: </label>
          <p>{s.name}</p>
        </div>
        <div className="form-row">
          <label>Год: </label>
          <p>{s.created_year}</p>
        </div>
        <div className="form-row">
          <label>Тип: </label>
          <p>{s.type}</p>
        </div>
        <div className="form-row">
          <label>Город: </label>
          <p>{s.city}</p>
        </div>
        <label>Описание: </label>
        <p>{s.description}</p>
        <button
          onClick={() => {
            router.push(`/data/sights/${s.sight_id}`);
          }}
        >
          Перейти на страницу
        </button>
      </div>
    </CustomModal>
  );
}
