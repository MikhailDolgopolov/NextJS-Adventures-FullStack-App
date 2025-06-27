'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import TitleSubtitle from '@/components/TitleSubtitle';
import SmartWaiter from '@/components/SmartWaiter';
import Loading from '@/components/Loading';
import SouvenirRow from '@/components/entity-components/Rows/SouvenirRow';
import SightRow from '@/components/entity-components/Rows/SightRow';
import EditCityModal from '@/components/entity-components/Modals/EditCityModal';

import { City } from '@/lib/typeorm/entities/City';
import { Sight } from '@/lib/typeorm/entities/Sight';
import { Souvenir } from '@/lib/typeorm/entities/Souvenir';

type Props = {
  city: City;
  initialSouvenirs: Souvenir[];
  initialSights: Sight[];
};

const CityPageClient: FC<Props> = ({ city, initialSouvenirs, initialSights }) => {
  const router = useRouter();
  const [souvenirs, _setSouvenirs] = useState(initialSouvenirs);
  const [sights, _setSights] = useState(initialSights);
  const [loadingSouvenirs, _setLoadingSouvenirs] = useState(false);
  const [loadingSights, _setLoadingSights] = useState(false);

  const deleteCity = async () => {
    if (confirm(`Удалить все данные города ${city.city}?`)) {
      await fetch(`/api/cities/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: city.city }),
      });
      router.back();
    }
  };
  

  return (
    <>
      <TitleSubtitle title={city.city} />

      <div className="side-margins flex gap-4">
        <EditCityModal
          city={city}
          openTrigger={<button className="btn">Редактировать</button>}
          onChange={() => {
            // You can optionally re-fetch or mutate state here.
          }}
        />
        <button className="btn danger" onClick={deleteCity}>
          Удалить город
        </button>
      </div>

      <div className="two-columns">
        {/* Souvenirs Section */}
        <section>
          <h2>Сувениры</h2>
          <SmartWaiter timesUp={!loadingSouvenirs}>
            {souvenirs.length > 0 ? (
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Название</th>
                    <th className="px-4 py-2">Город</th>
                    <th className="px-4 py-2">Тип</th>
                    <th className="px-4 py-2">Материал</th>
                  </tr>
                </thead>
                <tbody>
                  {souvenirs.map((s) => (
                    <SouvenirRow key={s.souvenir_id} s={s} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="note">Пусто...</p>
            )}
            <Loading object="сувениры" />
          </SmartWaiter>
        </section>

        {/* Sights Section */}
        <section>
          <h2>Достопримечательности</h2>
          <SmartWaiter timesUp={!loadingSights}>
            {sights.length > 0 ? (
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Название</th>
                    <th className="px-4 py-2">Город</th>
                    <th className="px-4 py-2">Тип</th>
                  </tr>
                </thead>
                <tbody>
                  {sights.map((s) => (
                    <SightRow key={s.sight_id} s={s} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="note">Пусто...</p>
            )}
            <Loading object="достопримечательности" />
          </SmartWaiter>
        </section>
      </div>
    </>
  );
};

export default CityPageClient;
