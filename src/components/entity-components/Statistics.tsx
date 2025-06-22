'use client';

import LoadingError from '@/components/LoadingError';
import { AdventuresStatistics } from '@/helpers/HelperTypes';

interface StatisticsProps {
  data?: AdventuresStatistics;
  loading: boolean;
}

export default function Statistics({ data, loading }: StatisticsProps) {
  if (!data) {
    return <LoadingError loadingObject="статистику" loading={loading} />;
  }
  return (
    <>
      <h2>Статистика</h2>
      <h4>Из учтённого</h4>
      <p>Всего путешествий: <strong>{data.numberOfTrips}</strong></p>
      <p>Всего сувениров:   <strong>{data.numberOfSouvenirs}</strong></p>
    </>
  );
}
