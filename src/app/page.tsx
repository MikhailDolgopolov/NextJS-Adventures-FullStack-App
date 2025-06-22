'use client';
import { useRouter } from 'next/navigation';
import TitleSubtitle from "@/components/TitleSubtitle";
import useFetch from "@/hooks/useFetch";
import LoadingError from '@/components/LoadingError';

export default function Home() {
    const router = useRouter();
    const [result, load] = useFetch("");

    if (load) return <LoadingError loading={load} loadingObject="приложение" wholePage={true} />;
    if (!result) return <LoadingError loading={false} loadingObject="приложение" wholePage={true} />;

    return (
        <>
            <TitleSubtitle title="Главная страница" hideHomeButton={true} />
            <div className="vert-margins">
                <button className="big side-margins" onClick={() => router.push('/trips/')}>
                    Все путешествия
                </button>
                <button className="big side-margins" onClick={() => router.push('/data/')}>
                    База данных
                </button>
                <button className="big side-margins" onClick={() => router.push('/files/')}>
                    Файлы
                </button>
            </div>
        </>
    );
}
