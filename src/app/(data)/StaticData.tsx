'use client';

import { FC } from 'react';
import useSWR, { mutate } from 'swr';

import LoadingError from '@/components/LoadingError';
import TitleSubtitle from '@/components/TitleSubtitle';
import Statistics from '../../components/entity-components/Statistics';

import CountryRow from '@/components/entity-components/Rows/CountryRow';
import CityRow    from '@/components/entity-components/Rows/CityRow';
import PersonRow  from '@/components/entity-components/Rows/PersonRow';
import SouvenirRow from '@/components/entity-components/Rows/SouvenirRow';

import AddCountryModal from '@/components/entity-components/Modals/AddCountryModal';
import AddCityModal    from '@/components/entity-components/Modals/AddCityModal';
import AddPersonModal  from '@/components/entity-components/Modals/AddPersonModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus }        from '@fortawesome/free-solid-svg-icons';

import { AdventuresStatistics } from '@/helpers/HelperTypes';

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to load statistics');
    return res.json() as Promise<AdventuresStatistics>;
  });

const StaticData: FC = () => {
  const { data: stats, error, isLoading } = useSWR<AdventuresStatistics>(
    '/api/statistics',
    fetcher
  );

//   if (isLoading) {
//     return <LoadingError loadingObject="данные" loading />;
//   }
  if (error || !stats) {
    return <LoadingError loadingObject="данные" loading={false} wholePage />;
  }

  return (
    <>
      <TitleSubtitle title="База данных" />

      <div className="two-columns side-margins">
        {/* Left column: Countries, Cities, People */}
        <div className="flow-down">
          {/* Countries */}
          <section>
            <h2>Страны</h2>
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Население</th>
                  <th>Площадь, км<sup>2</sup></th>
                  <th>Столица</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hoverable button">
                  <AddCountryModal openTrigger={
                    <td colSpan={4} className="text-center">
                      <FontAwesomeIcon icon={faPlus} />
                    </td>
                  } onAdd={() => mutate('/api/statistics')} />
                </tr>
                {stats.countries.map((c) => (
                  <CountryRow key={c.country} prop={c} />
                ))}
              </tbody>
            </table>
          </section>

          {/* Cities */}
          <section>
            <h2>Города</h2>
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Страна</th>
                  <th>Население</th>
                  <th>Год основания</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hoverable button">
                  <AddCityModal openTrigger={
                    <td colSpan={4} className="text-center">
                      <FontAwesomeIcon icon={faPlus} />
                    </td>
                  } onAdd={() => mutate('/api/statistics')} defaultCountry="" />
                </tr>
                {stats.cities.map((c) => (
                  <CityRow key={c.city} prop={c} />
                ))}
              </tbody>
            </table>
          </section>

          {/* People */}
          <section>
            <h2>Люди</h2>
            <table>
              <thead>
                <tr>
                  <th>Сокращение</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hoverable button">
                  <AddPersonModal openTrigger={
                    <td colSpan={3} className="text-center">
                      <FontAwesomeIcon icon={faPlus} />
                    </td>
                  } onAdd={() => mutate('/api/statistics')} />
                </tr>
                {stats.people.map((p) => (
                  <PersonRow key={p.person_id} prop={p} />
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* Right column: Souvenirs & Stats */}
        <div className="flow-down">
          <section>
            <h2>Сувениры</h2>
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
                {stats.souvenirs.map((s) => (
                  <SouvenirRow key={s.souvenir_id} s={s} />
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2>Статистика</h2>
            <Statistics data={stats} loading={isLoading}/>
          </section>
        </div>
      </div>
    </>
  );
};

export default StaticData;
