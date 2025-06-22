'use client';

import { useState, useEffect } from 'react';
import CustomModal from '@/components/CustomModal';
import SearchInput from '@/components/SearchInput';
import useFetch from '@/hooks/useFetch';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { post } from '@/lib/api';
import { City } from '@/lib/typeorm/entities/City';
import { Country } from '@/lib/typeorm/entities/Country';

interface EditCityModalProps {
  city: City;
  openTrigger: React.ReactNode;
  onChange: () => void;
}

export default function EditCityModal({ city, openTrigger, onChange }: EditCityModalProps) {
  const router = useRouter();

  // Fetch list of all countries
  const [countries, loadingCountries] = useFetch<Country[]>('countries');
  const [selectedCountry, setCountry] = useState<string>(city.country);

  // Set up form
  const { register, handleSubmit, reset } = useForm<City>();

  // When city prop changes (or modal opens), reset form values
  useEffect(() => {
    reset({
      city: city.city,
      population: city.population,
      founded_year: city.founded_year,
      country: city.country,
    });
    setCountry(city.country);
  }, [city, reset]);

  if (loadingCountries && !countries) {
    return null;
  }
  if (!countries) {
    return <p className="note">Не удалось загрузить список стран.</p>;
  }

  const onSubmit: SubmitHandler<City> = async (data) => {
    data.country = selectedCountry;
    try {
      const updated: City = await post<City, City>(`cities/update/${city.city}`, data);
      onChange();    // signal parent to refetch
      // If the city key changed, navigate to new URL
      if (updated.city !== city.city) {
        router.push(`/data/cities/${updated.city}`);
      }
    } catch (err) {
      console.error('City update failed', err);
      alert('Ошибка при обновлении города.');
    }
  };

  return (
    <CustomModal header="Изменить данные" trigger={openTrigger} onClose={reset}>
      <form className="vert-window" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label>Название:</label>
          <input
            defaultValue={city.city}
            {...register('city', { required: true })}
            required
          />
        </div>

        <div className="form-row">
          <label>Страна:</label>
          <SearchInput<Country>
            id="allCountries"
            array={countries}
            stringify={(c) => c.country}
            defaultValue={city.country}
            onlySelect
            onSetValue={(c) => setCountry(c)}
          />
        </div>

        <div className="form-row">
          <label>Население:</label>
          <input
            type="number"
            defaultValue={city.population}
            {...register('population', { valueAsNumber: true })}
          />
        </div>

        <div className="form-row">
          <label>Год основания:</label>
          <input
            type="number"
            defaultValue={city.founded_year}
            {...register('founded_year', { valueAsNumber: true })}
          />
        </div>

        <button type="submit">Сохранить</button>
      </form>
    </CustomModal>
  );
}
