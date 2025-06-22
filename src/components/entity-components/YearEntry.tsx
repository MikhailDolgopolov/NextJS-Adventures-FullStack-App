'use client';

import { FC } from 'react';
import useSWR from 'swr';
import LoadingError from '@/components/LoadingError';
import TripBlock from '@/components/entity-components/TripBlock';
import { Trip } from '@/lib/typeorm/entities/Trip';

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error('Network error');
  return r.json() as Promise<Trip[]>;
});

interface YearEntryProps {
  year: number;
}

const YearEntry: FC<YearEntryProps> = ({ year }) => {
  const { data: trips, error, isLoading } = useSWR<Trip[]>(
    `/api/trips/years/${year}`,
    fetcher
  );

  if (isLoading) {
    return <LoadingError loadingObject={`путешествия в ${year}`} loading />;
  }
  if (error || !trips) {
    return <LoadingError loadingObject={`путешествия в ${year}`} loading={false} />;
  }

  return (
    <div className="outline trip-row">
      <div className="row">
        <h3>{year} год</h3>
      </div>
      {trips.length > 0 ? (
        <div className="grid">
          {trips.map((trip) => (
            <TripBlock key={trip.trip_id} trip={trip} />
          ))}
        </div>
      ) : (
        <p className="note">Нет путешествий за {year} год.</p>
      )}
    </div>
  );
};

export default YearEntry;
