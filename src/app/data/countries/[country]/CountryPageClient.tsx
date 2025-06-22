'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import TitleSubtitle from '@/components/TitleSubtitle';
import SmartWaiter from '@/components/SmartWaiter';
import Loading from '@/components/Loading';
import SouvenirRow from '@/components/entity-components/Rows/SouvenirRow';
import SightRow from '@/components/entity-components/Rows/SightRow';
import TripBlock from '@/components/entity-components/TripBlock';
import AddCityModal from '@/components/entity-components/Modals/AddCityModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Country } from '@/lib/typeorm/entities/Country';
import { City } from '@/lib/typeorm/entities/City';
import { Sight } from '@/lib/typeorm/entities/Sight';
import { Souvenir } from '@/lib/typeorm/entities/Souvenir';
import { Trip } from '@/lib/typeorm/entities/Trip';

type Props = {
  country: Country;
  cities: City[];
  sights: Sight[];
  souvenirs: Souvenir[];
  trips: Trip[];
};

const CountryPageClient: FC<Props> = ({ country, cities, sights, souvenirs, trips }) => {
  const router = useRouter();
  // If you want to mutate these lists client-side, uncomment:
  // const [cityList, setCityList] = useState(cities);
  // const [sightList, setSightList] = useState(sights);
  // const [souvenirList, setSouvenirList] = useState(souvenirs);
  // const [tripList, setTripList] = useState(trips);

  const deleteCountry = async () => {
    if (confirm(`Удалить все данные страны ${country.country}?`)) {
      await fetch('/api/countries/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: country.country }),
      });
      router.back();
    }
  };

  return (
    <>
      <TitleSubtitle title={country.country} />

      <div className="side-margins flex gap-4">
        {/* Replace with an EditCountryModal when ready */}
        {/* <EditCountryModal ... /> */}
        <button className="btn danger" onClick={deleteCountry}>
          Удалить страну
        </button>
      </div>

      <div className="two-columns even">
        {/* Left column: Souvenirs & Trips */}
        <div className="flow-down">
          <section>
            <h2>Сувениры</h2>
            <SmartWaiter timesUp={souvenirs.length > 0}>
              {souvenirs.length > 0 ? (
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th>Название</th>
                      <th>Город</th>
                      <th>Тип</th>
                      <th>Материал</th>
                    </tr>
                  </thead>
                  <tbody>
                    {souvenirs.map((s) => (
                      <SouvenirRow key={s.souvenir_id} s={s} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="note">Пусто…</p>
              )}
              <Loading object="сувениры" />
            </SmartWaiter>
          </section>

          <section>
            <h2>Поездки</h2>
            <SmartWaiter timesUp={trips.length > 0}>
              <div className="flex-grid outline">
                {trips.length > 0 ? (
                  trips.map((t) => <TripBlock key={t.trip_id} trip={t} />)
                ) : (
                  <p className="note">Пусто…</p>
                )}
              </div>
              <Loading object="путешествия" />
            </SmartWaiter>
          </section>
        </div>

        {/* Right column: Sights & Cities */}
        <div className="flow-down">
          <section>
            <h2>Достопримечательности</h2>
            <SmartWaiter timesUp={sights.length > 0}>
              {sights.length > 0 ? (
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th>Название</th>
                      <th>Город</th>
                      <th>Тип</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sights.map((s) => (
                      <SightRow key={s.sight_id} s={s} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="note">Пусто…</p>
              )}
              <Loading object="достопримечательности" />
            </SmartWaiter>
          </section>

          <section>
            <h2>Города</h2>
            <div className="row">
              <AddCityModal
                openTrigger={
                  <button className="big center-child square">
                    <FontAwesomeIcon icon={faPlus} size="2x" />
                  </button>
                }
                onAdd={() => {
                  /* optionally refetch / mutate city list */
                }}
                defaultCountry={country.country}
              />
            </div>
            <SmartWaiter timesUp={cities.length > 0}>
              <div className="flex-grid outline">
                {cities.length > 0 ? (
                  cities.map((c) => (
                    <button
                      key={c.city}
                      className="hoverable"
                      onClick={() => router.push(`/data/cities/${c.city}`)}
                    >
                      {c.city}
                    </button>
                  ))
                ) : (
                  <p className="note">Пусто…</p>
                )}
              </div>
              <Loading object="города" />
            </SmartWaiter>
          </section>
        </div>
      </div>
    </>
  );
};

export default CountryPageClient;
