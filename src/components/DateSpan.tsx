'use client';

import { FC } from 'react';

type DateSpanProps = {
  d1: Date | string;
  d2?: Date | string | null;
};

const DateSpan: FC<DateSpanProps> = ({ d1, d2 }) => {
  const format = (date: Date | string) =>
    new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <p>
      <span className="date">{format(d1)}</span>
      {d2 && (
        <>
          <span> – </span>
          <span className="date">{format(d2)}</span>
        </>
      )}
    </p>
  );
};

export default DateSpan;
