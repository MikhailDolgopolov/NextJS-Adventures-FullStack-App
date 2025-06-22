'use client';

import { useForm } from 'react-hook-form';
import Modal from '@/components/CustomModal';
import { Trip } from '@/lib/typeorm/entities/Trip';
import useSWR from 'swr';
import { post } from '@/lib/api';

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json() as Promise<Trip[]>;
  });

type AddTripModalProps = {
  openTrigger: React.ReactNode;
  onClose?: () => void;
  onAdd: (trip: Trip) => void;
};

export default function AddTripModal({ openTrigger, onClose, onAdd }: AddTripModalProps) {
  const { register, handleSubmit, reset } = useForm<Trip>();
  const { data: allTrips } = useSWR<Trip[]>('/api/trips', fetcher);


  const onSubmit = handleSubmit((data) => {
    const duplicate = allTrips?.find((t) => t.title === data.title);
    if (duplicate) {
      alert('Такое путешествие уже добавлено.');
      return;
    }

    post<Trip, Trip>('trips/create/', data).then((createdTrip) => {
      onAdd(createdTrip);
    });
  });

  return (
    <Modal header="Новое путешествие" trigger={openTrigger} onCloseCallback={onClose} onOpenCallback={() => reset()}>
      <form className="vert-window" onSubmit={onSubmit}>
        <div className="form-row">
          <label>Название:</label>
          <input required {...register('title')} />
        </div>

        <div className="form-row">
          <label>Начало:</label>
          <input type="date" required {...register('start_date')} autoComplete="off" />
        </div>

        <div className="form-row">
          <label>Окончание:</label>
          <input type="date" {...register('end_date')} autoComplete="off" />
        </div>

        <div className="form-row">
          <label>Описание:</label>
          <input {...register('description')} />
        </div>

        {/* hidden default fields */}
        <input {...register('trip_id')} value={0} hidden readOnly />
        <input {...register('photo_link')} value={''} hidden readOnly />

        <button type="submit">Добавить</button>
      </form>
    </Modal>
  );
}
