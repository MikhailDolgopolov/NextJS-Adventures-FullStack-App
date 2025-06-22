'use client';

import { useRouter } from 'next/navigation';
import { Trip } from '@/lib/typeorm/entities/Trip';
import React from 'react';
import DateSpan from '../DateSpan';

type TripBlockProps = {
  trip: Trip;
};

const TripBlock = ({ trip }: TripBlockProps) => {
  const router = useRouter();

  return (
    <button
      className="grid-block highlight text-left"
      onClick={() => router.push(`/trip/${trip.trip_id}`)}
    >
      <h3>{`${trip.title}`}</h3>
      <DateSpan d1={trip.start_date} d2={trip.end_date} />
      {trip.description?.trim() && <p>{trip.description}</p>}
    </button>
  );
};

export default TripBlock;
