'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import TitleSubtitle from '@/components/TitleSubtitle';
import EditEntry from '@/components/EditEntry';
import LoadingError from '@/components/LoadingError';
import SmartWaiter from '@/components/SmartWaiter';
import Loading from '@/components/Loading';
import SouvenirRow from '@/components/entity-components/Rows/SouvenirRow';
import SightRow from '@/components/entity-components/Rows/SightRow';
import useFetch from '@/hooks/useFetch';
import useSwitch from '@/hooks/useSwitch';
import { post } from '@/lib/api';
import { City } from '@/lib/typeorm/entities/City';
import { Sight } from '@/lib/typeorm/entities/Sight';
import { Souvenir } from '@/lib/typeorm/entities/Souvenir';
import EditCityModal from '@/components/entity-components/Modals/EditCityModal';

export default function CityPage() {
  const { city: cityParam } = useParams() as { city: string };
  const router = useRouter();
  const [refetchAll, flip] = useSwitch();
  const editRef = useRef<HTMLButtonElement>(null);

  // Fetch the full City object
  const [city, loadingCity] = useFetch<City>(`cities/${cityParam}`, refetchAll);
  // Fetch related data
  const [souvenirs, loadingSouvenirs] = useFetch<Souvenir[]>(`souvenirs/for_city/${cityParam}`, refetchAll);
  const [sights, loadingSights]       = useFetch<Sight[]>(`sights/for_city/${cityParam}`, refetchAll);
  
  if (loadingCity && !city) return <Loading />;
  if (!city) return <LoadingError loadingObject="город" loading={false} />;

  

  // Delete handler
  const deleteCity = async () => {
    if (confirm(`Вы собираетесь удалить все данные, связанные с ${city.city}. Продолжить?`)) {
      await post('cities/delete', city.city);
      flip();
      router.back();
    }
  };

  return (
    <>
      <TitleSubtitle title={city.city} />

      {/* Edit / Delete controls */}
      <div className="side-margins">
        <EditEntry onEdit={flip} onDelete={deleteCity} editRef={editRef} editModal={EditCityModal} properties={[city, editRef, flip]}>
          <button
            className="self-left"
            onClick={() => router.push(`/data/countries/${city.country}`)}
          >
            {city.country}
          </button>
        </EditEntry>

      </div>

      <div className="two-columns">
        {/* Left: Souvenirs */}
        <div className="flow-down">
          <section>
            <h2>Сувениры</h2>
            <SmartWaiter timesUp={!loadingSouvenirs}>
              {souvenirs && souvenirs.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Название</th>
                      <th>Город</th>
                      <th>Тип</th>
                      <th>Материал</th>
                    </tr>
                  </thead>
                  <tbody>
                    {souvenirs.map(s => (
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
        </div>

        {/* Right: Sights */}
        <div className="flow-down">
          <section>
            <h2>Достопримечательности</h2>
            <SmartWaiter timesUp={!loadingSights}>
              {sights && sights.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Название</th>
                      <th>Город</th>
                      <th>Тип</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sights.map(s => (
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
      </div>
    </>
  );
}
