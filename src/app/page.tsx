import Link from 'next/link';
import TitleSubtitle from '@/components/TitleSubtitle';

export const metadata = {
  title: 'Главная страница',
};

export default function Home() {
  return (
    <>
      <TitleSubtitle title="Главная страница" hideHomeButton />

      <div className="vert-margins flex justify-center gap-4">
        <Link href="/trips" className="big side-margins">
          Все путешествия
        </Link>
        <Link href="/data" className="big side-margins">
          База данных
        </Link>
        <Link href="/files" className="big side-margins">
          Файлы
        </Link>
      </div>
    </>
  );
}
