'use client'

import TitleSubtitle from '@/components/TitleSubtitle';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <TitleSubtitle title="Главная страница" hideHomeButton />

      <div className="flex justify-center gap-6 mt-10">
        <Link href="/trips">
          <Button variant="bordered" size="lg">Все путешествия</Button>
        </Link>
        <Link href="/data">
          <Button variant="bordered" size="lg">База данных</Button>
        </Link>
        <Link href="/cities">
          <Button variant="bordered" size="lg">Города</Button>
        </Link>
        <Link href="/countries">
          <Button variant="bordered" size="lg">Страны</Button>
        </Link>
      </div>
    </>
  );
}
