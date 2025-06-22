'use client';
import Link from 'next/link';
import LoadingError from './LoadingError';
import useFetch from '@/hooks/useFetch';

interface EntityListProps<T> {
  endpoint: string;
  label: string;
  getKey: (item: T) => string;
  renderLabel: (item: T) => React.ReactNode;
  pathPrefix: string; // e.g. '/data/cities'
}

export default function EntityList<T>({
  endpoint,
  label,
  getKey,
  renderLabel,
  pathPrefix,
}: EntityListProps<T>) {
  const [items, loading] = useFetch<T[]>(endpoint);
  if (loading) return <LoadingError loadingObject={label} loading />;
  if (!items) return <LoadingError loadingObject={label} loading={false} />;

  return (
    <ul>
      {items.map(item => {
        const key = getKey(item);
        return (
          <li key={key}>
            <Link href={`${pathPrefix}/${key}`}>
              {renderLabel(item)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
