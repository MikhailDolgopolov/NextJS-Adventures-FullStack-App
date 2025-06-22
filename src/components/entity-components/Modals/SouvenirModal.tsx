'use client';

import { useRouter } from 'next/navigation';
import CustomModal from '@/components/CustomModal';
import { Souvenir } from '@/lib/typeorm/entities/Souvenir';
import { SouvenirTitle } from '@/helpers/db-functions';
import OptionalFormRow from '@/components/OptionalFormRow';
import { FC } from 'react';

type SouvenirModalProps = {
  s: Souvenir;
  trigger: React.ReactNode;
};

const SouvenirModal: FC<SouvenirModalProps> = ({ s, trigger }) => {
  const router = useRouter();

  return (
    <CustomModal header={SouvenirTitle(s)} trigger={trigger}>
      <div className="vert-window space-y-2">
        <OptionalFormRow label="Материал: " value={s.material ?? undefined} />
        <OptionalFormRow label="Тип: " value={s.type ?? undefined} />
        <OptionalFormRow label="Город: " value={s.city ?? undefined} />
        <OptionalFormRow label="Описание: " value={s.description ?? undefined} />
        <button
          className="text-primary underline"
          onClick={() => {
            router.push(`/data/souvenirs/${s.souvenir_id}`);
          }}
        >
          Перейти на страницу
        </button>
      </div>
    </CustomModal>
  );
};

export default SouvenirModal;
