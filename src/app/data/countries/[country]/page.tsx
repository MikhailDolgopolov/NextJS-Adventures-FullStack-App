'use client';

import { useParams, useRouter } from 'next/navigation';
import TitleSubtitle from '@/components/TitleSubtitle';
// import EditEntry from '@/components/EditEntry';
import AddCityModal from '@/components/entity-components/Modals/AddCityModal';
import LoadingError from '@/components/LoadingError';
import SouvenirRow from '@/components/entity-components/Rows/SouvenirRow';
import SightRow from '@/components/entity-components/Rows/SightRow';
import Loading from '@/components/Loading';
import useFetch from '@/hooks/useFetch';
import useSwitch from '@/hooks/useSwitch';
// import { post } from '@/lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TripBlock from '@/components/entity-components/TripBlock';
import SmartWaiter from '@/components/SmartWaiter';
import { City } from '@/lib/typeorm/entities/City';
import { Sight } from '@/lib/typeorm/entities/Sight';
import { Souvenir } from '@/lib/typeorm/entities/Souvenir';
import { Trip } from '@/lib/typeorm/entities/Trip';
// import EditCountryModal from '@/components/entity-components/Modals/EditCountryModal';
import { Country } from '@/lib/typeorm/entities/Country';

export default function CountryPage() {
  const { country } = useParams() as { country: string };
  const [countryObj, loadingCountry] = useFetch<Country>(`countries/${country}`);
  const router = useRouter();
  const [refetch, flip] = useSwitch();

  // Fetch various bits of data
  const [capital, loadingCapital] = useFetch<City>(`countries/capital/${country}`, refetch);
  const [sights, loadingSights]     = useFetch<Sight[]>(`sights/for_country/${country}`, refetch);
  const [souvenirs, loadingSouvenirs] = useFetch<Souvenir[]>(`souvenirs/for_country/${country}`, refetch);
  const [cities, loadingCities]     = useFetch<City[]>(`cities/for_country/${country}`, refetch);
  const [trips, loadingTrips]       = useFetch<Trip[]>(`trips/for_country/${country}`, refetch);

  if (loadingCountry && !countryObj) return <Loading />;
  if (!countryObj) return <LoadingError loadingObject="страну" loading={false} />;

//   // Handle delete
//   const deleteCountry = async () => {
//     if (confirm(`Вы собираетесь удалить все данные, связанные с ${country}. Продолжить?`)) {
//       await post('countries/delete', country);
//       flip();
//       router.back();
//     }
//   };

  // Wait for initial load
  if (loadingCapital && !capital) return <LoadingError loadingObject="столицу" loading />;
  if (!capital) return <LoadingError loadingObject="столицу" loading={false} />;

  return (
    <>
      <TitleSubtitle title={capital.country || country} />
      {/* Edit / Delete */}
      <div className="side-margins">
        {/* <EditEntry onEdit={flip} onDelete={deleteCountry} editRef={editRef}>
          <button
            className="self-left"
            onClick={() => router.push(`/data/cities/${capital.city}`)}
          >
            {capital.city}
          </button>
        </EditEntry> */}
        {/* <EditCountryModal
          country={countryObj}
          onChange={() => { flip(); }}
          cities={cities || []}
        /> */}
      </div>

      <div className="two-columns even">
        {/* Left column: Souvenirs & Trips */}
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
                <p className="note">Пусто…</p>
              )}
              <Loading object="сувениры" />
            </SmartWaiter>
          </section>

          <section>
            <h2>Поездки</h2>
            <SmartWaiter timesUp={!loadingTrips}>
              <div className="flex-grid outline">
                {trips && trips.length > 0 ? (
                  trips.map(t => <TripBlock key={t.trip_id} trip={t} />)
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
                <p className="note">Пусто…</p>
              )}
              <Loading object="достопримечательности" />
            </SmartWaiter>
          </section>

          <section>
            <h2>Города</h2>
            <div className="row">
              
                <AddCityModal
              addCityButton={
                <button
                className="big center-child square"
                onClick={flip}
              >
                <FontAwesomeIcon icon={faPlus} size="2x" />
              </button>
              }
              onAdd={flip}
              defaultCountry={country}
            />
        
            </div>
            
            <SmartWaiter timesUp={!loadingCities}>
              <div className="flex-grid outline">
                {cities && cities.length > 0 ? (
                  cities.map(c => (
                    <button
                      key={c.city}
                      data-selected="0"
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
}
