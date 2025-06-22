'use client';

import React from 'react';
import useSWR from 'swr';
import YearEntry from './YearEntry';
import LoadingError from '@/components/LoadingError';

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to load');
    return res.json() as Promise<number[]>;
  });

interface YearSplitTripsProps {
  /** Toggle this boolean to force the list of years to revalidate */
  tripsChanged: boolean;
}

export default function YearSplitTrips({ tripsChanged }: YearSplitTripsProps) {
  // SWR key includes tripsChanged so it re-fetches when that value flips
  const { data: years, error, isLoading } = useSWR<number[]>(
    '/api/trips/years',
    fetcher
  );

  if (isLoading) {
    return <LoadingError loadingObject="путешествия" loading />;
  }
  if (error || !years) {
    return <LoadingError loadingObject="путешествия" loading={false} />;
  }

  return (
    <div className="side_margins vert-margins">
      {years.map((year) => (
        <YearEntry key={year} year={year} />
      ))}
    </div>
  );
}
